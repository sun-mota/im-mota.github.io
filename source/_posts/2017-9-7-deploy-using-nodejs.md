---
layout: post
title: nodeJS로 간단한 Deploy Script 만들기
tags: 
- "nodejs"
- "Intergration"
- "개발자"
categories: 
- "Javascript"
published: true
---

요즘은 AWS CodeDeploy나 Jenkin등을 이용해 간단한 Deploy tool을 이용한다.
이들을 이용하면 간단히 테스트를 붙여 돌릴 수도 있고 버전관리도 쉽게 가능하여 개인적으로도 매우 선호한다.
하지만 현 프로젝트를하며 위의 툴을 사용하려니 문제를 만났다.

1. 내부망에서만 접속가능
2. 유지비가 저렴해야함
3. 구축하는데 너무 많은 시간을 투자 하지 말 것
4. 이미 있는 서버를 사용할 것

우선 나는 젠킨스를 사용만 해봤지 설치나 관리를 해본적이 없으므로 패스
이미 있는 서버는 ssh 관리자 계정만 있는 상태라 코드 디플로이 연동이 불가능
위와 같은 이유로 Deploy Script를 만들게 된다.

- - -
# 준비물
node script이니 nodejs는 당연이 필요하고
모듈로는 세 가지가 필요하다.
    
    npm install --save ssh2
    npm install --save prompt
    npm install --save archiver

사전에 프로젝트를 빌드시키는 스크립트는 따로 있어야 한다.
빌드 스크립트는 프레임웍마다 다르니 패스.

- - -
# 플로우
빌드된 파일들을 zip으로 압축하여 서버에 업로드 시킨다.
빌드파일명은 `날짜-GitHash.zip`으로 약속한다.
압축을 해당 프로젝트 디렉토리의 압축파일명과 같은 디렉토리에 푼다.
웹페이지로 연결시켜줄 심링크를 최근 디렉토리로 업데이트 시킨다.

- - -
# 현재 빌드 정보 가져오기
파일명, 디렉토리명 등을 관리하는 `PUBLISH_INFO.js`를 따로 만든다.
```javascript
// PUBLISH_INFO.js

const proc = require('child_process');
// 마지막 커밋의 날짜
const date = proc.execSync(`git log --date=format:%b%d --pretty=tformat:%cd -1`).toString().trim();
// 마지막 커밋의 Hash
const hash = proc.execSync(`git log --pretty=tformat:%h -1`).toString().trim();
// 현재 브랜치
const branch = proc.execSync('git branch | grep \\* | cut -d \' \' -f2-').toString().replace('feature/', '').trim();

const arr = branch.split('/');
let dir = '';
let dir = '';
if (arr.length > 1 && arr[0] === 'feature') {
  dir = arr[1];
} else {
  dir = arr[0];
}

module.exports = {
  dir, // 브랜치명으로 프로젝트 디렉토리를 관리한다.
  filename: date + '-' + hash,
  date,
  hash,
  branch
};
```
- - -
# 빌드 결과물 압축하기
빌드 결과물을 압축하는 `zip.js`를 만든다.
```javascript
// zip.js

var archiver = require('archiver')
const publishInfo = require('./PUBLISH_INFO');
console.log('\nCreating .zip file...');

const fileName = publishInfo.filename;

var output = fs.createWriteStream(fileName + '.zip');
var archive = archiver('zip');

output.on('close', function() {
  // 압축 완료
  console.log('Archive has been created.');
  console.log('File size: ' + archive.pointer() + ' total bytes');
});

archive.on('error', function(err) {
  throw err;
});

archive.pipe(output);

archive.bulk([
    { expand: true, src: ['**/*', '!*.zip'], dest: fileName }
]).finalize();
```
- - -
# ssh2 접속 정보 받기
ssh에 접속하여 진행되는 나머지 함수들은 `deploy.js`에 작성한다.
서버 접속 계정 정보는 따로 파일에서 관리하게 되면 아무래도 보안상 안전하지 않으므로
터미널에서 입력을 받아 스크립트를 내에서만 들고 있도록 한다.
```javascript
// deploy.js

// prompt는 터미덜에서 사용자의 입력값을 받을 수 있도록 해준다.
const prompt = require('prompt');
prompt.start();
// 서버 계정의 아이디와 비밀번호를 받아온다.
prompt.get([
  {
    name: 'username',
    require: true,
  },
  {
    name: 'password',
    hidden: true,
    require: true,
    replace: '*',
  }
], (err, result) => {
  prompt.stop();
  if (err) {
    console.error(err);
    return 1;
  }
  
  // 사용자의 입력 값이 성공적으로 받아졌다.
  // 서버를 연결한다.
  connectToServer(result.username, result.password);
});
```
- - -
# ssh2 접속하기
```javascript
// deploy.js

// 클라이언트 변수는 서버 접속 뿐 아니라 여려 프로세스 처리에 사용되므로 전역으로 관리한다.
const Client = require('ssh2').Client;
const c = new Client();

// 파일 및 디텍토리 명 또한 업로드 및 압축 관리 등 여러 프로세스에서 사용 된다.
const PUBLISH_DESTINATION = '웹루트 디렉토리';
const branchDir = PUBLISH_DESTINATION + require('./PUBLISH_INFO').dir;
const fileName = require('./PUBLISH_INFO').filename;
const releaseDir = branchDir + '/' + fileName;

function connectToServer(username, password) {
  c.once('ready', function() {
    c.sftp(function(err, sftp) {
      if (err) throw err;

      // 서버 접속 성공!!!!
      sftp.readdir(PUBLISH_DESTINATION, function(err, list) {
        if (err) throw err;

        // 웹루트가 존재 하는 경우 해당 브랜치 디렉토리를 확인한다.
        searchBranchDir(sftp);
      });
    });
  });
  const destination = {
    host: '서버 호스트 주소',
    port: '22',
    username,
    password,
  };

  c.connect(destination);
  // ssh2 서버 접속
}
```

- - -
# 프로젝트 디렉토리 확인 하기
이미 존재하는 브랜치 있지만 신생 브랜치의 경우 디렉토리 자체가 없는 경우가 있다.
이 경우를 위해 디렉토리가 존재하는지 확인 하고 없는 경우 새로 생성한다.
```javascript
// deploy.js

function searchBranchDir(sftp) {
  sftp.readdir(branchDir, (err, list) => {
    if (err) {
      // 브랜치 디렉토리가 없는 경우 새로 생성한다.
      sftp.mkdir(branchDir);
      searchBranchDir(sftp);
      return;
    }

    // 업로드 된지 오래된 버전들을 삭제한다.
    removeOldReleases(sftp, list);
    // 현재 압축한 파일을 업로드한다.
    uploadArchiveFile(sftp);
  });
}
```
- - -
# 오래된 버전 삭체
여러가지 브랜치들이 한 서버로 업로드 하다보니
파일들이 쌓이고 쌓여 메모리 부족을 일으킬 수 있으므로
브랜치당 적정 개수의 버전들만 남기고 오래된 것은 삭제한다.
```javascript
// deploy.js

function removeOldReleases(sftp, files) {
  if (files.length > 6) {
    const sortedList = files.sort((a, b) => {
      // 파일 수정 날짜를 확인하여 소팅한다.
      return a.attrs.mtime > b.attrs.mtime;
    });
    for (let i = 0; i < sortedList.length - 6; i++) {
      // 최근 5개를 제외한 폴더를 제거한다.
      const fn = sortedList[i].filename;
      // 파일 제거는 sftp로 불가능하므로 직접 코맨드 명령을 보낸다.
      c.exec('rm -Rf ' + branchDir + '/' + fn, {}, (err) => {
        if (err) {
          console.error(err);
        } else {
          console.log('- Removed', branchDir + '/' + fn);
        }
      })
    }
  }
}
```
- - -
# 업로드하기
```javascript
// deploy.js

function uploadArchiveFile(sftp) {
  // 로컬 읽기 스트림 생성
  const readStream = require('fs').createReadStream(fileName + 'zip');
  // 서버 쓰기 스트림 생성
  const writeStream = sftp.createWriteStream(releaseDir + '.zip');

  writeStream.on('close', function() {
    // 업로드 완료!!
    console.clear();
    console.info('* Created archive file...');
    console.info('* Completed uploading "' + fileName + '.zip" file to "' + branchDir + '"');

    // 압축 풀기
    unzipArchive(sftp);
  });

  let flag = true;
  writeStream.on('drain', (...arg) => {
    flag = !flag;
    console.clear();
    console.info('* Created archive file...');
    // 업로드 진행중임을 표시한다.
    // 콘솔이 멈춰있는 것을 방지하기 위해 약간의 다이나믹을 추가한다.
    if (flag) {
      console.info('\ Uploading "' + fileName + '.zip" file to "' + branchDir + '"');
    } else {
      console.info('| Uploading "' + fileName + '.zip" file to "' + branchDir + '"');
    }
  })
  // 업로드 시작
  readStream.pipe( writeStream );
}
```
- - -
# 압축 풀기
```javascript
// deploy.js

function unzipArchive(sftp) {
  console.info('* Unziping "' + fileName + '.zip" on the server);

  // 압축풀기는 sftp에서 지원하지 않는다.
  // 클라이언트에 직접 코맨드 명렬을 보낸다.
  const command = `cd ${branchDir}; unzip -o ${fileName}.zip`;
  c.exec(command, { pty: true }, (err, stdio) => {
    stdio.on('data', (data) => {
      // 압축이 풀리는 중, 어떤 파일이 풀리는지 출력한다.
      console.log(data.toString());
    });
    stdio.on('exit', function(code, signal) {
      console.info(`* Complete unziping "${fileName}.zip" on the server`);
      // 압축 풀기 완료!!

      createSymlink(sftp);
    });
  });
}
```
- - -
# 심링크 업데이트
웹페이지로 연결시켜줄 심링크를 최근 디렉토리로 업데이트 시킨다.
본인의 현재 프로젝트의 경우 `latest`로 심링크를 명명하였다.
```javascript
// deploy.js

function createSymlink(sftp) {
  function run() {
    sftp.symlink(releaseDir, branchDir + '/latest');
    console.info(`* Complete creating symlink "${branchDir}/latest"`);
    // 심링크 생성 완료!
    // 클라이언트 접속을 종료한다.
    c.end();
  }
  // 기존 심링크가 있는지 확인 한다.
  sftp.readdir(branchDir + '/latest', (err, list) => {
    if (err) {
      // 기존 심링크가 없는 경우 그냥 심링크를 생성한다.
      run();
    } else {
      // 기존 심링크가 있는 경우, 기존 것을 삭제하고 새로 생성한다.
      sftp.unlink(branchDir + '/latest', () => {
        run();
      });
    }
  });
}
```
- - -
# package.json 업데이트
npm 명령어 추가를 위해 package.json파일을 업데이트한다.
    
    "scripts": {
      "zip": "node build/zip.js",
      "deploy": "node build/deploy.js",
    },

차후 빌드 이후 `npm run zip; npm run deploy` 코맨드 명령을 내리면
압축부터 디플로이까지 한 줄로 간편히 해결된다.

- - -
여러가지 에러 케이스들을 방어하지 않았다.
(팀내에서만 작게 사용하는 경우기도 하고, 사실 귀찮다...)
접속 정보를 잘 못입력하여 접속에 실패한 경우를 제외하고는
아직까지 에러케이스를 만나보지 않았다.
차후 시간이 좀 되면 node module로 따로 빼고 싶긴하다.
- - -