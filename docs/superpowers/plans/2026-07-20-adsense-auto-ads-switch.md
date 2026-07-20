# Burglin' Gnomes AdSense Auto Ads Switch Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the authorized AdSense publisher with `pub-9151036466808188` and load its Auto Ads library once on normal content pages while keeping search, legal pages, GPT, and affiliate behavior unchanged.

**Architecture:** Keep the integration in the shared `index.html` head, but use a pathname guard that dynamically appends the supplied AdSense script only on approved content routes. Extend the existing AdSense compliance script before production edits, then update the intentional `ads.txt` protected hash while preserving all three GPT hashes.

**Tech Stack:** Vite HTML template, Vue 3 SSR/SSG, Node.js compliance tests, agent-browser, GitHub atomic commit, Vercel.

## Global Constraints

- `public/ads.txt` contains exactly `google.com, pub-9151036466808188, DIRECT, f08c47fec0942fa0` plus its terminating newline.
- The old publisher ID `pub-9435047454967498` is removed from active AdSense authorization and loading code.
- Auto Ads loads once on `/` and normal content routes, but not on `/search` or `/legal/*`.
- `src/config/gpt.js`, `src/components/GptAd.vue`, and `src/utils/gptAds.js` stay byte-for-byte unchanged.
- The GPT block and all `<GptAd>` placements stay commented and inactive.
- Affiliate advertising behavior stays unchanged.
- No page content, heading, route, metadata, sitemap membership, or indexability change.

---

### Task 1: Add failing publisher and loader checks

**Files:**
- Modify: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: `public/ads.txt`, `index.html`, generated HTML, and the existing protected manifest.
- Produces: deterministic failures until the approved publisher line and guarded Auto Ads loader are present.

- [ ] **Step 1: Add exact ads.txt assertions**

Require `public/ads.txt` to equal:

```js
const expectedAdsTxt = 'google.com, pub-9151036466808188, DIRECT, f08c47fec0942fa0\n'
```

Fail if the old publisher ID remains in `public/ads.txt`.

- [ ] **Step 2: Add Auto Ads loader assertions**

Require `index.html` to contain exactly one occurrence of:

```text
https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9151036466808188
```

Require the existing path expressions `location.pathname !== '/search'` and `!location.pathname.startsWith('/legal/')`. Require the loader to set `async`, `crossOrigin = 'anonymous'`, and append to `document.head`.

- [ ] **Step 3: Add GPT inactivity checks**

Strip HTML comments from `index.html` and assert that the active remainder does not contain `securepubads.g.doubleclick.net`, `googletag.defineSlot`, or `googletag.defineOutOfPageSlot`. Keep the three GPT protected hashes unchanged.

- [ ] **Step 4: Run RED**

Run: `npm.cmd run test:adsense`

Expected: failures for the old `ads.txt`, missing new Auto Ads URL, and missing loader behavior; existing GPT checks remain green.

---

### Task 2: Switch ads.txt and add the guarded Auto Ads loader

**Files:**
- Modify: `public/ads.txt`
- Modify: `index.html`
- Modify: `scripts/ads-protected-manifest.json`
- Test: `scripts/check-adsense-hardening.mjs`

**Interfaces:**
- Consumes: the approved publisher ID and existing route exclusions.
- Produces: one content-only `adsbygoogle.js` request and an updated intentional `ads.txt` hash.

- [ ] **Step 1: Replace ads.txt exactly**

Write only:

```text
google.com, pub-9151036466808188, DIRECT, f08c47fec0942fa0
```

- [ ] **Step 2: Add a head loader before the paused GPT comment**

Add:

```html
<script>
  if (location.pathname !== '/search' && !location.pathname.startsWith('/legal/')) {
    const adsenseAutoAds = document.createElement('script');
    adsenseAutoAds.async = true;
    adsenseAutoAds.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9151036466808188';
    adsenseAutoAds.crossOrigin = 'anonymous';
    document.head.appendChild(adsenseAutoAds);
  }
</script>
```

Do not edit the immediately following commented GPT block.

- [ ] **Step 3: Update only the ads.txt protected hash**

Calculate SHA-256 from the actual new `public/ads.txt` bytes. Replace only the manifest value for `public/ads.txt`; verify the three GPT hash strings are unchanged.

- [ ] **Step 4: Run GREEN**

Run: `npm.cmd run build; npm.cmd run test:adsense`

Expected: 138 routes pre-rendered and `AdSense hardening check passed`.

---

### Task 3: Verify, publish, and recheck production

**Files:**
- Modify: `docs/adsense-owner-recheck.md`

**Interfaces:**
- Consumes: the finished integration and current remote main SHA.
- Produces: owner-facing publisher/CMP checklist, atomic production commit, and live verification evidence.

- [ ] **Step 1: Update the owner checklist**

Record the new publisher ID, exact `ads.txt` line, content-only loader boundary, continued GPT pause, and the need to configure the same publisher in AdSense. Keep CMP setup as an unchecked owner action.

- [ ] **Step 2: Run fresh local verification**

Run:

```powershell
npm.cmd run lint
npm.cmd run build
npm.cmd run test:adsense
```

Expected: all exit 0, 138 routes generated, 137 sitemap URLs unchanged.

- [ ] **Step 3: Browser-check route classes**

At desktop and 390px mobile widths, verify `/`, `/items/rocket-launcher`, `/items`, and one guide load exactly one `adsbygoogle.js?client=ca-pub-9151036466808188` script. Verify `/search`, `/legal/about-us`, and `/legal/privacy-policy` load zero. Require zero `securepubads.g.doubleclick.net` requests and no horizontal overflow.

- [ ] **Step 4: Publish atomically**

Commit only the implementation, tests, plan, and owner checklist against the exact current `main` SHA. Abort if the remote SHA changed.

- [ ] **Step 5: Verify Vercel and production**

Wait for Vercel `success`, then confirm the live `ads.txt` exact content, content/excluded browser request counts, GPT inactivity, HTTP 200 responses, and unchanged sitemap URL count.
