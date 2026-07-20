# Burglin' Gnomes AdSense Auto Ads Switch Design

**Date:** 2026-07-20
**Scope:** Replace the AdSense publisher authorization and enable Auto Ads on normal content pages while keeping GPT paused

## Objective

Switch burglin-gnomes.org from AdSense publisher `pub-9435047454967498` to `pub-9151036466808188`, load the new publisher's Auto Ads library on normal content pages, and preserve the existing paused GPT implementation exactly.

## ads.txt

`public/ads.txt` will contain exactly one normalized line:

```text
google.com, pub-9151036466808188, DIRECT, f08c47fec0942fa0
```

The previous `pub-9435047454967498` line must be removed completely.

## Auto Ads loading

The equivalent of the supplied AdSense script will be loaded once from the shared document head:

```html
<script
  async
  src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9151036466808188"
  crossorigin="anonymous"
></script>
```

Because the user explicitly excluded search and legal pages, the shared template will use a small path guard:

- load on `/` and normal content routes;
- do not load on `/search`;
- do not load on `/legal/*`;
- append the script to `<head>` at most once per document.

The site uses direct anchor navigation for its primary navigation, so direct visits and normal link navigation re-evaluate the path guard. AdSense account-side page exclusions should still mirror these paths as defense in depth if Auto Ads later changes its placement behavior.

## GPT and affiliate boundaries

- The commented GPT block in `index.html` remains commented and is not edited.
- `src/config/gpt.js`, `src/components/GptAd.vue`, and `src/utils/gptAds.js` remain byte-for-byte unchanged.
- Existing commented `<GptAd>` placements remain commented.
- Affiliate banner and popunder behavior remains unchanged.
- No manual AdSense `<ins class="adsbygoogle">` placements are added; Google Auto Ads owns placement after the library loads.

## Compliance protection

The protected-file manifest will continue hashing the three GPT implementation files. Its `public/ads.txt` hash will be updated to the approved new value, because this change is intentional.

The AdSense hardening script will require:

1. `public/ads.txt` equals the approved single line;
2. the old publisher ID is absent from `ads.txt` and active Auto Ads code;
3. the new Auto Ads URL and client ID are present exactly once in the active loader;
4. the path guard excludes `/search` and `/legal/*`;
5. the generated search and legal pages contain no active Auto Ads script element after browser execution;
6. normal content pages load one Auto Ads library script;
7. the three protected GPT source hashes remain unchanged and the GPT block stays commented;
8. fingerprint collection remains absent and existing affiliate boundaries still pass.

## Verification and deployment

Before publication, run lint, the production SSG build, and the AdSense hardening suite. In a browser, verify a homepage, listing page, dynamic detail page, guide page, search page, and legal page at desktop and mobile widths.

After an atomic commit to the latest remote `main`, wait for Vercel success and verify:

- `https://burglin-gnomes.org/ads.txt` returns the new single line;
- normal content pages request the new `adsbygoogle.js` URL once;
- `/search` and `/legal/*` do not request it;
- `securepubads.g.doubleclick.net` is not requested;
- pages still return HTTP 200, retain full pre-rendered HTML, and do not overflow horizontally.

## Out of scope

- Enabling or altering GPT ad units
- Adding manual AdSense placements
- Removing or changing affiliate ads
- Installing a CMP or configuring AdSense account-side Auto Ads page exclusions
- Changing page content, headings, routes, metadata, sitemap membership, or indexability
