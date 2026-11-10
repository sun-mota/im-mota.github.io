# Portfolio Strengths Analysis

Two parts: **Alaska Airlines (Auro Design System)** and **Listriva** (own product).

# Alaska Airlines (Auro Design System) — Contribution Analysis

GitHub user: `sun-mota` · Org: `AlaskaAirlines` · Period: **Oct 2024 – Nov 2026**

## By the numbers

| Activity | Count |
|---|---|
| Pull requests authored | **395** (336 merged) |
| Issues opened | **284** |
| PRs reviewed (others' work) | **333** |
| PRs commented on (others') | 341 |
| Issues discussed (others') | 48 |
| Commits | **839** |
| Repositories touched | **52** |

Main repos: `auro-formkit` (197 PRs / 381 commits), `auro-library` (core utilities), `auro-drawer`, `auro-dialog`, `auro-button`, `auro-hyperlink`, `auro-flight`, `Icons`, `AuroDocsSite`.

PR mix: ~45% `fix`, ~26% `feat`, plus `test`, `perf`, `refactor`, `docs`, `ci`, `build`.

Reviewed work from 10+ teammates. The ones you reviewed most: jason-capsule42 (87), rmenner (61), jordanjones243 (52), chrisfalaska (38).

---

## Strengths

### 1. Owner of the design system's most complex package (auro-formkit)
- You **built auro-formkit** (Nov 2024): moved input, checkbox, radio, menu, select, combobox, datepicker and counter into one monorepo, and added a shared `register` API and a form `register` method.
- You **unified every dropdown component** (select, combobox, datepicker, counter-group) on one internal dropdown, then pulled the shared accessibility logic into one place.
- You shipped features end to end: the public `validate()` API, `auro-helptext`, the `stacked` layout, `valueText`/`displayValue` slots, size and shape props, `showBib`/`hideBib`, and `valueObject`/`minObject`/`maxObject` on date inputs.
- You led a multi-PR **datepicker localization** effort: an ISO date contract → a `locale` property passed down to child inputs → a localized calendar UI. You also added ISO date utilities to `auro-library`.

### 2. Accessibility engineering (your clearest specialty)
- 50+ of your PRs and 35+ of your issues are about a11y: focus traps, returning focus to the trigger, keyboard support, ARIA roles, `aria-expanded`, screen-reader labels, color contrast, focus-ring geometry.
- You filed and fixed issues rated **CRITICAL/SERIOUS**, such as hidden counter buttons that could still take focus, a password toggle with no keyboard access, and disabled-state contrast.
- You built **a11y testing infrastructure**: an `iterate()` helper in auro-library that runs the a11y check on every test iteration. You added it to several components.
- Shared a11y utilities: deep nested focusable support in the `FocusTrap`, an `a11yTransporter`, a fix so an empty aria-label override can't silently mute assistive tech, and screen-reader content in `auro-flight` merged into one `aria-label`.
- You deprecated APIs that broke a11y rules (for example, `role` on auro-hyperlink) and replaced them.

### 3. Large changes across many repos and API design
- In **Oct 2024 you rolled out the `register` static method to ~40 component repos** in a few weeks, along with the docs and build-tool changes (wca/api-docs generation) it needed.
- In **Oct 2025 you led the `ondark` → `appearance` migration**: a new attribute plus a deprecation path across ~20 components, with the work tracked in issues for each repo.
- You handled breaking changes on purpose: renames labeled as BREAKING CHANGE, deprecation warnings, and release-candidate (RC) coordination.

### 4. Platform and UI infrastructure
- `auro-library` FloatingUI: a drawer mode, scroll lock in fullscreen, Escape handling for modal dialogs, and a guard for a missing trigger slot.
- You **rebuilt auro-drawer on FloatingUI** and **moved auro-dialog to native `<dialog>`/popover**.
- **Mobile-first patterns**: fullscreen bibs on mobile for select, combobox, counter-group and datepicker.

### 5. Quality, testing and release work
- Test work: 100% coverage on `menu` with tests that mimic real user interaction, tests for invalid or incomplete datepicker values, keyboard tests for counter-group, and fixes for flaky tests in slow environments.
- **Release engineering**: you ran RC branches, reviewed 33 RC/release PRs, fixed packaging, upgraded to Node 22, and added `custom-elements.json` package identity stamping in `auro-actions`.
- **Custom Elements Manifest (CEM) quality**: a strict `cem-check` in the build for card, hyperlink and carousel, so editors, docs sites and AI tools get correct metadata.

### 6. Design ↔ engineering bridge (recent, forward-looking)
- **Figma Code Connect** for auro-button and auro-icon. This includes a mapping of 248 icons, plus mismatch and translation reports between Figma properties and code attributes.
- Icon and tail-logo work in `Icons`, and font-face registration in WebCoreStyleSheets.
- You went through designer feedback on tabs, combobox and inputs with the design team.

### 7. Communication and engineering maturity
- Your recent PR descriptions explain the change for non-engineers ("what the manifest is and why it matters"). You link Azure DevOps tickets and write **post-mortems** with root-cause analysis (for example, the focus-trap regression and input post-merge fixes).
- You updated manual-testing guides and docs, including AuroDocsSite and the commit-message guidelines.
- You use AI-assisted development openly (PRs marked co-authored with AI, adversarial-review notes).

### 8. Trusted reviewer
- 333 reviews across the team in ~25 repos. Review volume went from 61 (2024) to 155 (2025) to 117 (2026 so far). Reviews cover features, a11y fixes, migrations and every RC.
- Your issue reports read like specs: component name, exact symptom, and the framework involved (Svelte, React). Other teams and QA bring their bugs to you.

---

## Suggested portfolio framing

**Headline:** Senior Front-End / Design Systems Engineer specializing in accessible Web Components.

**Bullets to adapt:**
- Built and maintained the Auro **form kit** (input, select, combobox, datepicker, counter, menu) used across Alaska Airlines' web products. Authored 190+ PRs and 380+ commits in it.
- Led org-wide API migrations (`register`, `ondark`→`appearance`) across **40+ component repositories**.
- Drove accessibility: fixed critical WCAG issues, built focus-management utilities, and added a11y checks to every test iteration.
- Rebuilt overlay infrastructure (FloatingUI drawer and dialog, native dialog/popover, mobile fullscreen patterns).
- Added localization (ISO date contract, locale-aware datepicker).
- Strengthened release quality with RC management, strict CEM validation in CI, and Figma Code Connect between design and code.
- Reviewed **330+ PRs**; wrote post-mortems and testing guides.

**Tech:** Lit / Web Components, JavaScript, Shadow DOM, SCSS and design tokens, FloatingUI, Web Test Runner and axe a11y testing, GitHub Actions, npm releases, Custom Elements Manifest, Figma Code Connect, Storybook.

---

## Method and caveats
- Data comes from GitHub search: PRs and issues by author, `reviewed-by`, `commenter`, and commits by author in `AlaskaAirlines`.
- I couldn't read the text of review comments. The session can't call the GitHub API on AlaskaAirlines repos, and adding that access was declined. So the reviewing section is based on which PRs you reviewed, not on what you wrote in them.
- Theme counts come from keywords in titles and are approximate. Activity in private repos is included only if the search returned it.

---
---

# Listriva — Product, Design and Engineering Analysis

Repo: `sun-mota/listriva` · Live: listriva.com · Built **Nov 5 – Nov 10, 2026** (102 commits, 19 PRs, ~20k lines of TypeScript/Svelte, 27 unit/e2e test files)

**What it is:** a self-serve tool that turns a real estate listing into finished marketing materials. Customers check out as guests, pay once, and get a ZIP right away plus a secure link by email.
- **Listing Marketing Kit** ($9): 5 distinct social graphics, 5 captions, and a print-ready US Letter flyer.
- **Realtor Branding Kit** ($15): an introduction brochure, a branded graphic, and a bio.

**How it was built:** most commits are written by an AI coding agent (Claude Code) working from your direction. You are the one who merges every PR. This is the story to tell honestly: **you acted as product owner, designer, architect and reviewer, and used AI agents as the engineering team.** You shipped a paid product in under a week that way.

## 1. Product management strengths

**Decisive pivot from evidence**
- v1 was a social-publishing SaaS with accounts, Instagram/Facebook publishing and scheduling. It hit platform friction: the Meta app was stuck in Development mode, and OAuth redirects failed in production.
- You first worked around it: an **Instagram-only beta with a request-access flow** that walks testers through Meta's tester invite.
- Within three days you **pivoted** to a simpler product with fewer dependencies. No accounts, no subscriptions, no Meta connection; one-time payment and delivery by email.
- You kept old work recoverable instead of deleting it. `archive/social-publishing-saas-v1` and `archive/creative-studio-reels-v1` are preserved, and the README has recovery steps. The old product's 120 tests were re-run before the pivot merged.

**Packaging and pricing**
- Two clear products with a fixed list of deliverables and a price per unit ($9 per listing, $15 per agent).
- Products live in one catalog behind a feature flag (`AGENT_KIT_ENABLED`). Adding a product later costs little.
- Roadmap work already on branches, built as milestones:
  - a **Listing 3-Pack ($20 for three credits)** on a shared credit ledger
  - a **referral program** ("Give $2, Get 1 Free Kit")
  - owner-only gift kits
  - **Listing Reels** (vertical MP4, $7, or Kit + Reel for $15)
- This shows you think about moving from one-off purchases to bundles and growth loops.

**Trust as a product principle**
- A **truthfulness policy** is part of the spec. Materials use only facts the customer confirmed. Open houses print only if confirmed and still upcoming.
- Agent copy can never invent sales numbers, awards, rankings or testimonials. Generated copy that does is rejected and replaced.
- That is a strong answer to real estate's compliance risk and to AI's tendency to make things up.
- Privacy by default:
  - photo metadata (EXIF and GPS location) is removed
  - unpaid kits are deleted after 7 days
  - the only email sent is the transactional delivery link
- **Known limitations are written down openly.** Live Stripe and Resend calls still need checks, there's no OCR, refunds are manual, and the legal pages need a lawyer's review before launch.

**Turning requirements into a spec**
- The README is a full product spec:
  - the customer workflow, step by step and route by route
  - deliverables per product, and the ZIP layout
  - data model, security model, deployment, QA, limitations
- The details step only completes when the facts can support 5 distinct graphics, and otherwise **tells the user what to add**. That is product thinking built into the validation.

**Shipping discipline**
- Changes go to `main` as production; every other branch gets a preview URL.
- Analytics went in early (Vercel Web Analytics).
- Each PR says what was verified and what wasn't, and lists the follow-up steps after merging.
- A regression was caught and fixed within hours: analytics broke page loading on SvelteKit 3. The fix PR has a before/after table.

## 2. Design strengths

**A locked design system for the app** (`design.md`)
- Theme "Ink": white paper, a neutral black, one typeface (Epilogue), hairline rules, and **one teal that means only "in"** (ready, paid, delivered). Red is kept only for errors.
- Clear rules:
  - never a card inside a card
  - one filled button per view
  - no uppercase or letter-spacing on small text
  - no middle-dot separators in metadata
  - no hard-coded hex colours; add a token instead
  - animate only transform and opacity
  - every control has hover, active, focus-visible and disabled states
- Mobile first: one column per step and a sticky bottom action bar.
- A **voice guide** ("the desk volunteer's: what is ready, what is next, what you get… no buzzwords, no dashes").
- "Rules that never bend" protect routes, form names and e2e test hooks. The system can't break the product.

**A design system for the generated materials**
- 5 curated styles (palette plus font pairing) and 8 social layouts.
- **Rules that keep each kit varied:**
  - the 5 graphics use 5 different layouts
  - different lead photos when there are enough
  - light and dark backgrounds alternate
  - long headlines never go into the split layout
  - the layout order changes from listing to listing
- 5 creative angles, each with its own purpose and the minimum facts it needs: Property Hero, Feature Spotlight, Lifestyle Story, Quick Facts, Conversation Starter.
- A print pipeline: 300 DPI US Letter PDFs with 0.5 in margins, type that adapts to the amount of text, and bundled fonts so output looks the same everywhere.

**Iterating on the design**
- A full redesign (the "Hallmark" redesign) of the app, the landing page and the post images, with the decisions written down: what changed, what was kept on purpose, what rule was waived and why.
- A **prioritized design audit** (fixes down to P3 polish), a luxury redesign of the kit images, a brochure redesign "to sell the agent", and real photos and headshots in the examples.
- Visual QA sample listings (for example `luxury-estate` and `georgia-ranch`) and e2e checks that narrow screens don't overflow.
- Marketing assets: an Instagram launch series and a focused `/listing-kit` landing page built from shared landing-page sections.

## 3. Engineering and architecture strengths
- **Modular monolith** on SvelteKit 3 / Svelte 5, Supabase (Postgres, Storage, row-level security), Vercel, Stripe, Resend.
- **Payment correctness:**
  - signed Stripe webhooks, checked with a constant-time comparison and a 5-minute window
  - idempotent completion and stored event ids
  - order, amount and currency must match
  - duplicate payments are flagged for refund
  - a simulated checkout on preview deployments without Stripe
- **Security for guests with no accounts:**
  - a 256-bit token in an HttpOnly cookie, stored only as a hash
  - every kit table locked down, with no public policies or grants
  - the same 404 for an unknown kit, a wrong token and an expired kit
  - download links that are hashed, use-capped and revocable
  - protection against malicious ZIP file names
  - uploads checked and re-encoded
  - rate limits and per-kit AI budgets
- **Rendering pipeline** without generative-image services: satori → resvg → sharp, plus a custom PDF writer.
- **Credit ledger design** (Milestone 1): an append-only ledger with row locks, reserve/consume/release in one transaction, unique indexes so grants and redemptions can't happen twice, stale-reservation recovery, and a reconciliation check.
- Testing: unit tests for the parser, planner, layout variety, cliché filter and claims guard, plus Playwright e2e tests for purchase, the Realtor kit, layout and security.
- DevOps: a fixed preview domain that follows the latest preview, a database provisioning script, and a daily cleanup cron that works within Vercel Hobby limits.

## 4. What Listriva adds to your profile
Alaska Airlines shows **depth**: a long-running, high-standard, accessible component library at scale. Listriva shows **range and ownership**:
- you go from idea to paid product alone, with AI agents as the build team
- you make product calls (pivot, pricing, scope cuts, what to keep and what to archive) quickly
- your design systems are thorough
- you protect users and keep the product honest (truthfulness policy, privacy, written limitations)

## Updated portfolio framing

**Headline options**
- *Design Systems Engineer → Product Builder.* Accessible web components at enterprise scale; end-to-end products with AI-native development.
- *Front-end engineer who ships products: design system, product strategy and code.*

**Listriva bullets**
- Founded and shipped **Listriva**, a self-serve real estate marketing kit generator ($9 and $15 one-time purchases), from first commit to live payments in **6 days**, directing AI coding agents as the engineering team.
- **Pivoted** from a social-publishing SaaS blocked by platform dependencies to a product with fewer dependencies (guest checkout, delivery by email). Earlier versions are archived and recoverable.
- Wrote the product spec, pricing and roadmap: credit bundles, a referral loop and video reels, built as milestones.
- Created two design systems: a locked UI system (tokens, components, voice, rules) and a system for generated graphics (5 styles, 8 layouts, rules that keep each kit varied, 300 DPI print PDFs).
- Built in a **truthfulness guard** so AI copy never invents facts, sales figures or awards. That protects agents from compliance risk.
- Designed secure guest access, idempotent Stripe fulfillment and an append-only credit ledger on Supabase.

**Tech (Listriva):** SvelteKit 3 / Svelte 5, TypeScript, Tailwind, Supabase (Postgres, RLS, Storage, pg_cron), Stripe, Resend, Vercel, satori/resvg/sharp, Playwright, Vitest, Zod, Claude Code.
