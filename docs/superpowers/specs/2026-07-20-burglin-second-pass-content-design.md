# Burglin' Gnomes AdSense second-pass content design

**Date:** 2026-07-20
**Scope:** Three report-sampled pages and the site-wide unofficial-fan disclaimer

## Objective

Resolve the second AdSense preflight report's remaining sampled thin-content finding without creating new URLs, changing the indexability of other database pages, or altering the site's approved advertising boundaries.

## Page scope

Only these content pages will be deepened:

- `/items/rocket-launcher`
- `/items/stamina-dart`
- `/areas/outdoor-lawn`

Each generated page must contain 800–1,500 visible English words after the shared site chrome is excluded by the existing compliance check. The preferred working range is 850–1,200 words so the additions remain useful rather than padded.

No new content page will be created. The sitemap, route manifest, canonical behavior, and indexability of every other detail page remain unchanged.

## Heading preservation

All existing H1, H2, and H3 elements are immutable for this pass:

- no existing heading text may be changed;
- no existing heading may be removed;
- no existing heading level may be changed;
- the existing heading order must remain intact.

New page-specific H2 or H3 sections may be appended after the existing structure. Automated verification will capture the existing heading sequence before implementation and require that sequence to remain an ordered prefix after implementation.

## Content approach

The three pages will receive distinct, player-oriented sections rather than a repeated generic template.

### Rocket Launcher

New material will focus on whether the weapon justifies a detour, route preparation, safe firing decisions, team spacing, objective overlap, alternatives when it does not appear, failure recovery, and patch-sensitive checks.

### Stamina Dart

New material will focus on support-role decisions, when stamina recovery changes a route, target priority, timing and communication, comparison with mobility alternatives, avoiding wasted shots, and verification after patches.

### Outdoor Lawn

New material will focus on entry and exit planning, exposure management, task clustering, carrying decisions, threat-specific rerouting, team roles, extraction timing, and how to verify changing exterior conditions.

Claims must remain grounded in existing project data. The copy must not invent exact damage, probability, respawn, timer, or patch-history claims. Unverified behavior must be framed as a test procedure or marked with the site's existing `Inferred` or `Patch Sensitive` language.

## Unofficial-fan disclosure

The About page and the initial HTML of the site-wide footer will state clearly that:

> burglin-gnomes.org is an independent, player-created guide and is not affiliated with, endorsed by, or operated by Fobri. Burglin' Gnomes names, trademarks, images, and game materials belong to their respective rights holders.

The existing About-page and copyright-page disclosures remain; wording may be supplemented but not weakened. The footer version must be visible text, not metadata-only text.

## Advertising and privacy boundaries

- Google GPT integration remains paused and its protected source files remain byte-for-byte unchanged.
- `public/ads.txt` remains byte-for-byte unchanged.
- Affiliate advertising remains enabled on ordinary content pages, including the three expanded pages.
- Affiliate advertising remains excluded from `/search` and `/legal/*`.
- The removed fingerprint collection script and endpoint must not return.
- A certified CMP remains an AdSense-account/consent-platform owner action; this pass does not install an unconfigured CMP or fabricate consent state.

## Verification

Before deployment, automated and browser checks must confirm:

1. lint, production build, all-route prerendering, and the AdSense hardening suite pass;
2. each target page has 800–1,500 visible English words;
3. the pre-change heading sequence on each target page is preserved exactly and only new headings are appended;
4. the footer and About page contain the explicit unofficial-fan disclosure in initial HTML;
5. each representative page still has one H1, unique metadata, valid canonical output, and no mobile horizontal overflow;
6. content pages still load affiliate placements, while search and legal pages do not;
7. no page or request references the removed fingerprint script or endpoint;
8. the GPT protected-file hashes and `ads.txt` hash are unchanged;
9. the deployed production routes return HTTP 200 and the expected pre-rendered content without requiring client-side rendering.

## Out of scope

- New guide pages or routes
- Bulk expansion, merging, redirecting, or noindexing of other thin detail pages
- Changes to GPT configuration, GPT placements, `ads.txt`, or affiliate-ad policy
- Installing a CMP without the owner's selected and configured certified provider
- Inventing gameplay measurements or patch history not supported by the current source data
