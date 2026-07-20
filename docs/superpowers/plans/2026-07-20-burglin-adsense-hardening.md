# Burglin' Gnomes AdSense Hardening Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce crawlable static HTML for every current route, remove device fingerprint collection, preserve affiliate ads only on normal content pages, deepen the four report-sampled pages, and retain paused GPT configuration and `ads.txt` unchanged.

**Architecture:** Refactor the Vue application around one SSR-safe app/router factory, build client and server bundles with Vite, and run a deterministic Node prerender step over a shared route manifest. Route SEO descriptors will be resolved from the same data for client navigation and generated HTML, while compliance scripts enforce content, advertising, privacy, and protected-file constraints.

**Tech Stack:** Vue 3.5, Vue Router 5, Vite 8, `@vue/server-renderer`, Node.js ESM, Vercel static hosting.

## Global Constraints

- Pre-render all 138 current routes with meaningful initial HTML.
- Keep GPT code, ad-unit paths, and `public/ads.txt` paused and unchanged.
- Keep affiliate advertising on normal content pages, but load neither affiliate banners nor the popunder on `/search` or `/legal/*`.
- Delete the fingerprint collector and every reference to `collet-data.js` and `api.sdfgame.com/collect/api/report`.
- Set only `/search` to `noindex, follow` and remove only `/search` from the sitemap.
- Do not change the indexability or sitemap membership of the remaining database detail pages.
- Expand `/items/spoon`, `/items/sleep-dart`, `/areas/bathroom`, and `/bestiary/environmental-hazards` to 800–1500 rendered English words each.
- Preserve current URLs, page appearance, and browser interactions.
- Because Git HTTPS is blocked in this environment, publish verified files in one atomic GitHub API commit against the expected remote head instead of creating partial deployment commits.

---

### Task 1: Add failing compliance and static-output tests

**Files:**
- Create: `scripts/ads-protected-manifest.json`
- Create: `scripts/check-adsense-hardening.mjs`
- Modify: `package.json`

**Interfaces:**
- Consumes: source files, generated `dist` HTML, and SHA-256 hashes of `src/config/gpt.js`, `src/components/GptAd.vue`, `src/utils/gptAds.js`, and `public/ads.txt`.
- Produces: `npm run test:adsense`, an exit-code-based verification command used by every later task.

- [ ] **Step 1: Record protected advertising hashes**

Create JSON with this exact shape and hashes calculated from the current files:

```json
{
  "algorithm": "sha256",
  "files": {
    "src/config/gpt.js": "fa75f0521a52b8c1aba6a69012beb19d79cffb1669676f634207fa8831949787",
    "src/components/GptAd.vue": "c9d4f28bbb9e7a51a189540fcade3e5c2b4d07eb992b8727bd39c801414b9894",
    "src/utils/gptAds.js": "687a36f7b7264bb361d46feb5389a9c301175856b39c05ddfd80f693142e28a2",
    "public/ads.txt": "c9bf6b9201bfcdc7367eca97aabd36cdbb38807af66a82ed4da0f1512e472d18"
  }
}
```

- [ ] **Step 2: Write the failing compliance test**

`scripts/check-adsense-hardening.mjs` must:

```js
// 1. Re-hash every protected file and fail on mismatch.
// 2. Fail if index.html or any src/public file references collet-data.js or
//    api.sdfgame.com/collect/api/report.
// 3. Parse public/sitemap.xml and fail if /search is present.
// 4. Require generated HTML for /, the four sampled routes, /search, and all
//    five legal routes.
// 5. Require exactly one H1, a route-specific title, canonical, description,
//    robots metadata, JSON-LD, and at least three internal links per sampled
//    generated page.
// 6. Require 800–1500 body words on each sampled deep-content page.
// 7. Require no affiliate banner markup on /search and legal output.
// 8. Require no direct affiliate popunder tag on excluded output.
```

Use only Node built-ins (`node:fs`, `node:path`, `node:crypto`, `node:url`, and regular expressions) so the check adds no test framework dependency.

- [ ] **Step 3: Expose the test command**

Add:

```json
"test:adsense": "node scripts/check-adsense-hardening.mjs"
```

- [ ] **Step 4: Run the test and verify RED**

Run: `npm.cmd run test:adsense`

Expected: FAIL because `dist` is still a one-page CSR build, `/search` is in the sitemap, the fingerprint collector is referenced, and sampled detail pages do not have generated route HTML.

---

### Task 2: Refactor Vue into an SSR-safe application factory

**Files:**
- Create: `src/createSiteApp.js`
- Create: `src/entry-server.js`
- Modify: `src/main.js`
- Modify: `src/router/index.js`
- Modify: `src/components/AffiliateAd.vue`
- Modify: `src/utils/affiliateAds.js`
- Modify: `package.json`

**Interfaces:**
- Produces: `createSiteApp(history)` returning `{ app, router }`, and `render(url)` returning `{ appHtml, seo }`.
- Consumes: Vue Router history objects and the route SEO resolver created in Task 3.

- [ ] **Step 1: Add a server-render smoke assertion**

Add a temporary assertion to the compliance script that imports `.ssr/entry-server.js`, calls `render('/')`, and requires `<h1` in `appHtml`.

- [ ] **Step 2: Run the assertion and verify RED**

Run: `npm.cmd run build:server`

Expected: FAIL because no server entry or server build command exists.

- [ ] **Step 3: Add the shared app factory**

`src/createSiteApp.js` must use `createSSRApp`, register `AffiliateAd` and `GptAd`, create the router from the supplied history, and return both objects:

```js
import { createSSRApp } from 'vue'
import App from './App.vue'
import AffiliateAd from './components/AffiliateAd.vue'
import GptAd from './components/GptAd.vue'
import { createSiteRouter } from './router/index.js'

export function createSiteApp(history) {
  const app = createSSRApp(App)
  app.component('AffiliateAd', AffiliateAd)
  app.component('GptAd', GptAd)
  const router = createSiteRouter(history)
  app.use(router)
  return { app, router }
}
```

- [ ] **Step 4: Make router creation history-agnostic**

Export `createSiteRouter(history)` from `src/router/index.js`. Move the current route table, guards, and `afterEach` registration inside the factory. Remove the eager singleton and default export so server imports never instantiate web history.

- [ ] **Step 5: Hydrate on the client**

`src/main.js` must create browser history, wait for the initial route, and hydrate the generated markup:

```js
import { createWebHistory } from 'vue-router'
import { createSiteApp } from './createSiteApp.js'
import './assets/global.css'

const { app, router } = createSiteApp(createWebHistory(import.meta.env.BASE_URL))
router.isReady().then(() => app.mount('#app'))
```

- [ ] **Step 6: Add the server entry**

`src/entry-server.js` must create memory history, push the requested URL, wait for readiness, call `renderToString(app)`, and return the rendered HTML plus the route descriptor supplied by Task 3.

- [ ] **Step 7: Guard affiliate banner sizing during SSR**

`getAffiliateBannerSize()` must return the existing 728×90 desktop dimensions when `window` is unavailable. Browser matching and script injection must remain inside client-only paths, and `AffiliateAd.vue` must initialize the remote script only from `onMounted`.

- [ ] **Step 8: Add the direct dependency and build command**

Install `@vue/server-renderer` at the same version as Vue and add:

```json
"build:server": "vite build --ssr src/entry-server.js --outDir .ssr"
```

- [ ] **Step 9: Verify GREEN for server rendering**

Run: `npm.cmd run build:server`

Expected: exit 0 and `.ssr/entry-server.js` exports `render`.

---

### Task 3: Centralize route metadata and prerender all routes

**Files:**
- Create: `src/seo/routeManifest.js`
- Create: `src/seo/resolveRouteDocument.js`
- Create: `src/seo/renderHead.js`
- Create: `scripts/prerender.js`
- Modify: `src/router/index.js`
- Modify: `src/seo/documentMeta.js`
- Modify: `index.html`
- Modify: `package.json`

**Interfaces:**
- Produces: `getPrerenderRoutes(): string[]`, `resolveRouteDocument(path): RouteDocument`, and `renderHead(RouteDocument): string`.
- `RouteDocument` contains `{ title, description, keywords, canonicalUrl, robots, ogImage, ogType, jsonLd }`.

- [ ] **Step 1: Add failing route-manifest tests**

Require the manifest to contain `/`, `/items/spoon`, `/areas/bathroom`, all five legal routes, and `/search`; require every route to be unique; require the count to equal the current generated route count.

- [ ] **Step 2: Verify RED**

Run: `npm.cmd run test:adsense`

Expected: FAIL because the manifest and generated route files do not exist.

- [ ] **Step 3: Implement the shared route manifest**

Build the route list from `sitemapStaticRoutes` plus existing item, recipe, area, guide, and bestiary datasets. Include `/search` for prerendering even though Task 4 removes it from the sitemap. Exclude redirect-only aliases.

- [ ] **Step 4: Implement the route document resolver**

Move the current detail-page lookup logic from `router.afterEach` into a pure resolver. Static routes use `routeSeo`; item, recipe, area, guide, and bestiary routes use their existing `tdk` or `seo` fields. `/search` returns `robots: 'noindex, follow'`; every other current route returns `robots: 'index, follow'`.

- [ ] **Step 5: Make client SEO consume the same descriptor**

Change `router.afterEach` to call `resolveRouteDocument(to.path)` followed by `applyDocumentSeo(descriptor)`. Update `applyDocumentSeo` so it respects `descriptor.canonicalUrl` and `descriptor.robots` instead of hardcoding `index, follow`.

- [ ] **Step 6: Add deterministic head rendering**

`renderHead()` must HTML-escape values and return one title, description, keywords, author, robots, googlebot, canonical, Open Graph group, Twitter group, and JSON-LD script. It must never serialize `undefined` values.

- [ ] **Step 7: Convert the HTML file to a prerender template**

Keep charset, viewport, favicon, theme color, analytics, paused GPT comments, and approved affiliate loader. Replace route-specific title/meta/JSON-LD with `<!--app-head-->`. Keep `<div id="app"></div>` as the `<!--app-html-->` replacement target.

- [ ] **Step 8: Implement prerendering**

`scripts/prerender.js` imports `.ssr/entry-server.js`, loads `dist/index.html`, renders every manifest route, injects the returned head and app HTML, and writes `/foo/bar` to `dist/foo/bar/index.html`. It must throw with the route path if rendering, metadata, or file writing fails.

- [ ] **Step 9: Wire the complete build**

Use:

```json
"build:client": "vite build",
"prerender": "node scripts/prerender.js",
"build": "npm run generate-sitemap && npm run build:client && npm run build:server && npm run prerender"
```

- [ ] **Step 10: Build and inspect RED/GREEN boundary**

Run: `npm.cmd run build`

Expected: static route files now exist and contain HTML, while the full compliance test may still fail on fingerprint, sitemap, privacy, affiliate exclusions, and word counts addressed by Tasks 4–5.

---

### Task 4: Enforce advertising, privacy, and search rules

**Files:**
- Delete: `public/collet-data.js`
- Modify: `index.html`
- Modify: `src/views/SearchView.vue`
- Modify: `src/views/Legal/PrivacyPolicyView.vue`
- Modify: `src/router/routeSeo.js`
- Modify: `src/seo/sitemapRoutes.js`
- Modify: `scripts/generate-sitemap.js`
- Create: `docs/adsense-owner-recheck.md`

**Interfaces:**
- Preserves: existing affiliate banner keys and popunder URL on content pages; protected GPT files and `ads.txt`.
- Produces: no fingerprint requests, no affiliate execution on excluded routes, crawlable trust disclosures, and an owner checklist.

- [ ] **Step 1: Add policy assertions and verify RED**

Require no fingerprint reference in source or output, no `/search` sitemap entry, `noindex, follow` in generated search HTML, and no affiliate banner or popunder execution on search/legal output.

- [ ] **Step 2: Remove fingerprint collection**

Delete `public/collet-data.js`, remove its script tag, and remove the unrelated `localStorage.removeItem('__lsv__')` cleanup adjacent to the collector. Verify no remaining reference to the collector or reporting endpoint.

- [ ] **Step 3: Preserve the popunder only on content routes**

Replace the direct popunder script tag with a pathname guard:

```html
<script>
  if (location.pathname !== '/search' && !location.pathname.startsWith('/legal/')) {
    const affiliatePopunder = document.createElement('script')
    affiliatePopunder.src = 'https://pl29872442.effectivecpmnetwork.com/0c/cf/83/0ccf83bcc91ffbffc62738ee96334611.js'
    document.body.appendChild(affiliatePopunder)
  }
</script>
```

- [ ] **Step 4: Remove search-page affiliate components**

Delete both active `<AffiliateAd />` instances from `SearchView.vue`; leave its search form, hints, and results unchanged.

- [ ] **Step 5: Remove search from sitemap only**

Remove the search entry from `sitemapStaticRoutes` and its source mapping from `generate-sitemap.js`. Do not add filtering for item, crafting, area, guide, or bestiary detail pages.

- [ ] **Step 6: Expand the privacy policy**

Add crawlable sections for data categories, hosting logs, Google Analytics, Google/third-party advertising cookies and identifiers, personalized/non-personalized ads, affiliate advertising, certified CMP obligations for EEA/UK/Switzerland, opt-out controls, voluntary email contact, retention, security, third-party links, policy updates, and contact. State explicitly that the site does not request precise location and no longer runs device-fingerprint collection.

- [ ] **Step 7: Write the owner recheck document**

Create a checklist mapping every report ID to `Verified in code`, `Owner check`, or `Not applicable`. Include concrete owner actions for age, duplicate AdSense accounts, DNS ownership, AdSense site approval, verification method, self-click prohibition, traffic sources, PII in ad requests, CMP activation, precise location, sensitive audiences, restricted targeting, and personalized-ad rights.

- [ ] **Step 8: Rebuild and verify policy GREEN**

Run: `npm.cmd run build` then `npm.cmd run test:adsense`.

Expected: fingerprint, sitemap, search robots, protected-file, and excluded-ad assertions pass; sampled word-count assertions remain until Task 5.

---

### Task 5: Deepen the four sampled content pages

**Files:**
- Modify: `src/data/itemsData.js`
- Modify: `src/data/areasData.js`
- Modify: `src/data/enemiesData.js`
- Modify: `src/views/ItemDetailView.vue`
- Modify: `src/views/AreaDetailView.vue`
- Modify: `src/views/BestiaryDetailView.vue`

**Interfaces:**
- Consumes: optional `deepDiveSections: Array<{ heading: string, paragraphs: string[], bullets?: string[] }>` on selected data records.
- Produces: four 800–1500-word rendered pages without adding generic text to other records.

- [ ] **Step 1: Add failing word-count assertions**

The compliance test must extract visible text from generated HTML and report the actual word count for each sampled route.

- [ ] **Step 2: Verify RED**

Run: `npm.cmd run test:adsense`.

Expected current approximate counts: Spoon 238, Sleep Dart 252, Bathroom 351, Environmental Hazards 282; all fail the 800-word floor.

- [ ] **Step 3: Add selected-record deep-dive content**

Add `deepDiveSections` only to the four matching records. Use these page-specific section sets:

- Spoon: quick answer, where it fits in an early run, safe pickup/equip workflow, melee spacing, co-op role split, comparison with crafted weapons, failure patterns, patch-verification checklist, and related routes.
- Sleep Dart: quick answer, Blowgun dependency, control-window workflow, solo versus co-op timing, target selection, ammo economy, mistakes that waste sleep, patch-sensitive behavior, and loadout links.
- Bathroom: route overview, entry/exit planning, cabinet and small-item search order, toilet/flood risks, human/rat pressure, two-player room roles, task-first decision tree, recovery route, patch checks, and related areas/items.
- Environmental Hazards: definition and scope, physics versus bug diagnosis, water/flood, fire/heat, moving machines, fall/ragdoll, co-op desync, safe reproduction protocol, rescue priorities, reporting evidence, and related guides.

Every factual paragraph must stay within existing observed/inferred/patch-sensitive data. Unknown damage values, spawn rates, timers, and guarantees must not be invented.

- [ ] **Step 4: Render the optional sections**

In each detail view, render `deepDiveSections` after the existing primary guide sections and before related links. Use one `<section>` and `<h2>` per record, paragraph elements for prose, and a list only when bullets exist. Do not render empty wrappers on records without the field.

- [ ] **Step 5: Rebuild and verify GREEN**

Run: `npm.cmd run build` then `npm.cmd run test:adsense`.

Expected: all four generated pages contain 800–1500 visible English words; other detail-route robots and sitemap behavior are unchanged.

---

### Task 6: Full verification and atomic publication

**Files:**
- Modify: `docs/superpowers/plans/2026-07-20-burglin-adsense-hardening.md` only to check completed boxes if desired.
- Publish: all verified implementation files in one GitHub commit.

**Interfaces:**
- Consumes: verified local source and remote `main` expected-head SHA.
- Produces: one production deployment and a live evidence report.

- [ ] **Step 1: Run fresh local verification**

```powershell
npm.cmd run test:adsense
npm.cmd run lint
npm.cmd run build
npm.cmd run test:adsense
```

Expected: all commands exit 0. If the existing lint scripts rewrite files, inspect the final diff and rerun build/tests afterward.

- [ ] **Step 2: Verify generated HTML without JavaScript**

Inspect `/`, the four sampled routes, `/search`, and all five legal routes in `dist`. Record titles, robots, H1 counts, body word counts, internal-link counts, and affiliate-script status.

- [ ] **Step 3: Verify desktop and mobile hydration**

Serve `dist`, then use browser automation at desktop and 390-pixel widths. Check homepage, one item page, one area page, one bestiary page, search, and privacy. Require no hydration errors, no horizontal overflow, functional navigation/search, affiliate scripts on content routes, and no affiliate scripts on search/legal routes.

- [ ] **Step 4: Reconcile with remote head**

Read the current GitHub `main` SHA and compare it with the expected design-spec head. If unrelated changes appeared, stop and reconcile rather than overwriting them.

- [ ] **Step 5: Publish atomically**

Use GitHub `createCommitOnBranch` with `expectedHeadOid` and an explicit file list. Include the implementation plan, audit checklist, dependency lockfile changes, source changes, tests, and deletion of `public/collet-data.js`. Do not include build artifacts or `node_modules`.

- [ ] **Step 6: Wait for Vercel and verify production**

Require successful deployment for the new commit. Fetch the same representative routes from `https://burglin-gnomes.org`, confirm HTTP 200 and initial HTML content, then run browser verification again.

- [ ] **Step 7: Report handoff**

Provide the production URL, commit URL, deployment status, representative word counts, proof that fingerprint collection is gone, proof that affiliate advertising remains only on allowed routes, confirmation that GPT/`ads.txt` hashes are unchanged, and the owner-only checklist path.
