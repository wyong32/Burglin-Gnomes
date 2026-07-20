# Burglin' Gnomes Second-Pass Content Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Expand the three report-sampled thin pages to 800–1,500 visible English words and publish an explicit site-wide unofficial-fan disclosure without changing existing headings or advertising boundaries.

**Architecture:** Add a focused `contentExpansionSections` data contract and render it after every existing detail-page section so the complete legacy heading sequence remains an exact prefix. Add route-specific content only to the three selected records, strengthen the shared footer and About-page disclosure, and extend the existing build-time AdSense compliance script to enforce heading preservation, content depth, placement, and protected-file hashes.

**Tech Stack:** Vue 3, Vite SSR/SSG, Node.js compliance scripts, static HTML inspection, agent-browser verification, Vercel deployment.

## Global Constraints

- Existing H1, H2, and H3 text, level, order, and presence must not change or be deleted; only new headings may be appended by the existing field-guide renderer.
- Only `/items/rocket-launcher`, `/items/stamina-dart`, and `/areas/outdoor-lawn` receive content expansion.
- Each target route must contain 800–1,500 visible English words, preferably 850–1,200.
- No new route, sitemap entry, redirect, canonical change, or indexability change.
- Do not invent exact damage, probability, respawn, timer, or patch-history claims.
- GPT protected files and `public/ads.txt` remain byte-for-byte unchanged.
- Affiliate ads remain on content pages and excluded from `/search` and `/legal/*`.
- Fingerprint collection must remain absent.

---

### Task 1: Add regression checks for the approved scope

**Files:**
- Modify: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: pre-rendered route HTML from `dist/<route>/index.html` and the current `itemsData` / `areasData` exports.
- Produces: failing checks for three content-expansion records, exact legacy heading-prefix preservation, three 800–1,500-word targets, and the About/footer disclosure.

- [ ] **Step 1: Write failing data-placement checks**

Import `itemsData`, resolve the exported item list, and assert that `rocket-launcher` and `stamina-dart` each have a non-empty `contentExpansionSections` array while `outdoor-lawn` has the same property on its own area record.

- [ ] **Step 2: Write failing heading-prefix checks**

Add an HTML heading extractor and these exact immutable baselines:

```js
const preservedHeadings = {
  '/items/rocket-launcher': [
    [1, "Rocket Launcher — Weapon Guide | Burglin' Gnomes"],
    [2, 'Rocket Launcher quick facts'],
    [2, 'Where to find Rocket Launcher'],
    [2, 'Recipes that craft or use Rocket Launcher'],
    [2, 'Items related to Rocket Launcher'],
    [2, 'Guide for using Rocket Launcher'],
    [2, 'How to use Rocket Launcher in a run'],
    [3, 'Where to find Rocket Launcher'],
    [3, 'How to use Rocket Launcher'],
  ],
  '/items/stamina-dart': [
    [1, "Stamina Dart — Ammo Guide | Burglin' Gnomes"],
    [2, 'Stamina Dart quick facts'],
    [2, 'Where to find Stamina Dart'],
    [2, 'Recipes that craft or use Stamina Dart'],
    [2, 'Items related to Stamina Dart'],
    [2, 'Guide for using Stamina Dart'],
    [2, 'How to use Stamina Dart in a run'],
    [3, 'How to get Stamina Dart'],
    [3, 'Use and properties'],
  ],
  '/areas/outdoor-lawn': [
    [1, "Outdoor Lawn — Exterior route Area Guide | Burglin' Gnomes"],
    [2, 'Outdoor Lawn route overview'],
    [2, 'Items and weapons found in Outdoor Lawn'],
    [2, 'Recipes connected to Outdoor Lawn'],
    [2, 'Tasks and danger checks in Outdoor Lawn'],
    [3, 'Tasks that can point here'],
    [3, 'Dangers to clear before looting'],
    [2, 'How to route Outdoor Lawn'],
    [3, 'Why the lawn matters'],
    [3, 'Outdoor threat control'],
  ],
}
```

Verify each baseline as the exact prefix of the generated H1/H2/H3 sequence. This proves every old heading remains unchanged and in the same order while permitting new headings only after the old sequence.

- [ ] **Step 3: Write failing content and disclosure checks**

Add the three routes to `deepRoutes`. Require the rendered About page and homepage footer to contain `independent, player-created guide`, `not affiliated with, endorsed by, or operated by Fobri`, and `respective rights holders`.

- [ ] **Step 4: Run the compliance test and verify RED**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: build succeeds, then the compliance test fails because the three records lack deep-dive content, their word counts remain below 800, and the exact disclosure is absent. Heading-preservation checks must pass against the baseline before production edits.

---

### Task 2: Deepen the two sampled item pages

**Files:**
- Modify: `src/data/itemsData.js`
- Modify: `src/views/ItemDetailView.vue`
- Test: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: the existing `makeItem()` input shape and `ItemDetailView.vue` route-notes endpoint.
- Produces: `contentExpansionSections: Array<{heading: string, paragraphs: string[], bullets?: string[]}>` on the `rocket-launcher` and `stamina-dart` records, rendered in a new section after the existing `notes` section.

- [ ] **Step 1: Add Rocket Launcher content**

Add the new renderer after the existing `notes` section, then append five page-specific data sections under the existing record without changing `name`, `tdk`, `sections`, or existing headings:

1. `Decide whether the detour is worth it`
2. `Prepare the firing route before pickup`
3. `Use explosive control without breaking the team plan`
4. `Compare safer alternatives when the launcher is missing`
5. `Recover from mistakes and verify patch-sensitive behavior`

Cover task-first routing, heavy-slot opportunity cost, clear firing lanes, team calls, exit planning, comparison with Grenade/Shotgun/Gun, and reproducible post-patch checks. Phrase uncertain spawn and mechanical behavior as verification guidance.

- [ ] **Step 2: Run the compliance test and confirm Rocket Launcher advances but the suite stays RED**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: Rocket Launcher reaches the target word range and its heading baseline remains ordered, while failures remain for Stamina Dart, Outdoor Lawn, and the disclosure.

- [ ] **Step 3: Add Stamina Dart content**

Attach `contentExpansionSections` to the generated `stamina-dart` item after creation, using five unique sections:

1. `Treat Stamina Dart as route support`
2. `Choose the right recovery window`
3. `Assign the dart to a clear co-op role`
4. `Compare stamina support with mobility choices`
5. `Avoid wasted shots and retest after patches`

Cover target priority, communication, route phase, ammo economy, comparison with Stamina Potion and Mobility alternatives, failure prevention, and verification limits. Do not claim an exact duration, stamina amount, or dart effect not present in source data.

- [ ] **Step 4: Run the compliance test and confirm only remaining scoped failures are Outdoor Lawn and disclosure**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: both item pages fall within 800–1,500 words and preserve all legacy headings in order.

---

### Task 3: Deepen Outdoor Lawn without template duplication

**Files:**
- Modify: `src/data/areasData.js`
- Modify: `src/views/AreaDetailView.vue`
- Test: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: the area record shape and the end of `AreaDetailView.vue` route notes.
- Produces: a route-specific `contentExpansionSections` array on `outdoor-lawn` only, rendered after the existing `notes` section.

- [ ] **Step 1: Add Outdoor Lawn content**

Append six sections that follow the outdoor route's own decision flow:

1. `Read the lawn before committing to an entry`
2. `Cluster outdoor tasks into one exposure window`
3. `Plan carries around doors, windows, and cover`
4. `Reroute for the cat and other exterior threats`
5. `Split scout, carrier, and safety roles in co-op`
6. `Choose the extraction moment and recheck changed routes`

Use the existing vine-window, cat, Fairy, bee, garden, and extraction context. Avoid guaranteed window layouts, spawn claims, or exact threat distances.

- [ ] **Step 2: Run the compliance test**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: all three scoped routes pass their word-range and heading-preservation checks; only disclosure checks remain RED.

---

### Task 4: Publish the explicit unofficial-fan disclosure

**Files:**
- Modify: `src/components/AppFooter.vue`
- Modify: `src/views/Legal/AboutUsView.vue`
- Test: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: shared SSR-rendered footer and existing About-page content.
- Produces: explicit, visible disclosure in every route's initial HTML and on `/legal/about-us`.

- [ ] **Step 1: Add footer disclosure without adding or changing headings**

Add visible paragraph text to the footer:

```text
burglin-gnomes.org is an independent, player-created guide and is not affiliated with, endorsed by, or operated by Fobri. Burglin' Gnomes names, trademarks, images, and game materials belong to their respective rights holders.
```

Keep the existing copyright line and navigation intact.

- [ ] **Step 2: Strengthen the About disclosure without changing its existing H1/H2 elements**

Add the same legal meaning to the existing hero or Trust and corrections prose. Do not edit, remove, reorder, or re-level any heading.

- [ ] **Step 3: Run the build and compliance suite and verify GREEN**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: `AdSense hardening check passed`, all seven deep routes print 800–1,500 words, and no heading/disclosure/protected-file failure appears.

---

### Task 5: Full verification, deployment, and production recheck

**Files:**
- Modify: `docs/adsense-owner-recheck.md`
- Verify only: `src/config/gpt.js`, `src/components/GptAd.vue`, `src/utils/gptAds.js`, `public/ads.txt`, `public/sitemap.xml`

**Interfaces:**
- Consumes: completed source changes and current protected hashes.
- Produces: updated owner checklist, verified production build, atomic GitHub commit, and live evidence.

- [ ] **Step 1: Update the owner checklist**

Record the three new sampled content routes and the explicit unofficial-fan disclosure. Keep CMP as an unchecked owner action and state that no CMP was installed in this pass.

- [ ] **Step 2: Run fresh local verification**

Run:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run test:adsense
```

Expected: all commands exit 0; 138 routes are pre-rendered; sitemap remains 137 URLs; target pages report 800–1,500 words.

- [ ] **Step 3: Verify browser layout and advertising boundaries**

At desktop and 390px mobile widths, inspect `/`, all three target routes, `/search`, `/legal/about-us`, and `/legal/privacy-policy`. Require one H1, no horizontal overflow, affiliate scripts on target content pages, zero affiliate scripts on search/legal pages, and zero fingerprint requests everywhere.

- [ ] **Step 4: Publish atomically against the current remote main SHA**

Create one GitHub commit containing only the reviewed source, test, plan, and checklist changes. Include no `dist`, `.ssr`, `node_modules`, cache, or temporary files. Abort publication if remote `main` moved after the expected-head check.

- [ ] **Step 5: Wait for Vercel and verify production**

Require the Vercel commit status to reach `success`. Fetch the three route HTML files without JavaScript and confirm HTTP 200, preserved old headings, added new sections, 800–1,500 words, and the footer disclosure. Verify the live sitemap still has 137 URLs, `/search` is absent, `ads.txt` is unchanged, and mobile pages do not overflow.
