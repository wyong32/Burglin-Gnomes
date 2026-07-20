# Burglin' Gnomes AdSense Hardening Design

## Objective

Make the existing Vue guide site crawlable without JavaScript, remove the undisclosed fingerprint collector, strengthen trust disclosures, and deepen the four pages sampled by the AdSense preflight report without changing the indexing status of the remaining database pages.

## Confirmed scope

- Pre-render all 138 current routes so navigation, headings, body copy, internal links, canonical metadata, social metadata, and structured data are present in the initial HTML response.
- Keep Google Publisher Tag configuration and ad-unit paths paused and unchanged.
- Keep `public/ads.txt` unchanged.
- Keep affiliate advertising on normal content pages.
- Remove affiliate banners and the global affiliate popunder from `/search` and every `/legal/*` route.
- Remove the `public/collet-data.js` fingerprint collector and its loading code. The site must no longer collect or transmit Canvas fingerprints, browser hardware details, battery details, WebRTC/IP signals, or related device attributes through that script.
- Set `/search` to `noindex, follow` and remove it from the sitemap.
- Do not apply `noindex` to other thin database detail pages and do not remove those pages from the sitemap in this phase.
- Expand the four sampled content pages to 800–1500 rendered English words each:
  - `/items/spoon`
  - `/items/sleep-dart`
  - `/areas/bathroom`
  - `/bestiary/environmental-hazards`
- Preserve all other page URLs and the current visual design.

## Rendering architecture

The current application mounts a Vue SPA into an empty `<div id="app"></div>`, so crawlers receive the same homepage shell for every route. Replace the single client-only build with a two-pass Vite/Vue static-generation pipeline:

1. Create a shared application factory that accepts browser history for hydration and memory history for server rendering.
2. Add a server entry that resolves a route, waits for Vue Router, and renders the application with `@vue/server-renderer`.
3. Build a route manifest from the existing static routes and the item, recipe, area, guide, and bestiary datasets.
4. Render every route to its own `dist/.../index.html` document.
5. Resolve each route's title, description, canonical URL, robots directive, Open Graph fields, Twitter fields, and JSON-LD from the same data used by the client router.
6. Hydrate the pre-rendered markup on the client so search, navigation, section tracking, and other interactive behavior continue to work.

Browser-only code must be guarded during server rendering. Affiliate banner sizing should render a stable placeholder on the server and initialize the existing affiliate script only after client mount.

## Advertising behavior

Affiliate advertising remains enabled on normal content pages. The popunder loader must check the current pathname before loading, and it must not run on `/search` or any `/legal/*` route. `SearchView.vue` must no longer render affiliate banner components.

GPT scripts, out-of-page definitions, banner components, and unit paths remain paused. A hash manifest and compliance check will protect the GPT configuration and `public/ads.txt` from accidental changes during this project.

## Privacy and trust pages

The existing About, Contact, Terms, Copyright, and Privacy routes will become crawlable through pre-rendering. The Privacy Policy will be expanded to disclose:

- standard hosting and security logs;
- Google Analytics and its cookies or identifiers;
- Google and other third-party advertising vendors, advertising cookies, device identifiers, personalized and non-personalized advertising, and opt-out controls;
- affiliate advertising and the possibility of third-party cookies or similar technologies;
- certified CMP requirements for visitors in the EEA, United Kingdom, and Switzerland;
- email data supplied voluntarily through the published contact address;
- the absence of account registration, payment processing, precise-location requests, and device-fingerprint collection after this change.

The footer will continue to expose all trust-page links in the initial HTML.

## Content deepening

The four sampled pages will receive page-specific, player-oriented sections rather than generic filler. Each page will use the existing evidence labels such as Observed, Inferred, and Patch Sensitive, and will cover route context, safe-use workflow, practical decisions, mistakes, co-op roles, verification limits, and related internal links. Claims that are not supported by the current dataset will be framed as testing guidance rather than game facts.

The homepage already renders approximately 987 English words in a JavaScript-enabled browser, so it needs pre-rendering but not a content rewrite in this phase. Other database pages retain their current content and indexability exactly as requested.

## Search treatment

`/search` remains available to users and is statically rendered with its search form and guidance. It will use `noindex, follow`, be removed from `sitemap.xml`, and load neither affiliate banners nor the global affiliate popunder. Its canonical URL remains the clean `/search` URL without query parameters.

## Error handling and safeguards

- The build fails if any expected route cannot be rendered.
- The build fails if a generated route lacks one H1, a unique title, a canonical URL, or meaningful initial HTML.
- The build fails if `/search` is present in the sitemap or uses an indexable robots directive.
- The build fails if the fingerprint script or its collection endpoint remains referenced.
- The build fails if protected GPT and `ads.txt` hashes change.
- Redirect-only aliases remain handled by Vue Router and are excluded from generated indexable pages.

## Verification

- Run the existing production build plus the new static-generation checks.
- Fetch the generated homepage, all four deepened pages, `/search`, and all trust pages without executing JavaScript.
- Confirm route-specific titles, descriptions, canonicals, robots directives, H1 counts, word counts, internal links, and JSON-LD.
- Confirm the four sampled pages each contain 800–1500 rendered English words.
- Confirm `/search` and legal pages contain no affiliate banner markup and the popunder loader excludes them.
- Confirm normal content pages still initialize affiliate advertising in a JavaScript-enabled browser.
- Confirm no request or script reference targets `collet-data.js` or `api.sdfgame.com/collect/api/report`.
- Confirm desktop and 390-pixel mobile layouts have no horizontal overflow or hydration errors.
- Deploy through the current Vercel integration, verify representative production routes return HTTP 200, and repeat the no-JavaScript checks against the live domain.

## Owner-only follow-up

The final audit checklist will distinguish code-verified items from account-level checks. The owner must still confirm age and account eligibility, domain/DNS ownership, AdSense site status, traffic-source quality, absence of self-clicking, and certified CMP configuration where required.
