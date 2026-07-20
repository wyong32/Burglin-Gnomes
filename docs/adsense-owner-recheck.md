# Burglin' Gnomes AdSense Owner Recheck

Use this checklist after the production deployment. Items marked **Code verified** are covered by automated or live checks. Items marked **Owner check** require access to the AdSense account, registrar, analytics, or traffic records.

## Blockers and high-priority checks

- [ ] **Code verified — ADS-CONTENT-01 / ADS-OWN-03:** Fetch `/`, `/items/spoon`, `/items/sleep-dart`, `/areas/bathroom`, and `/bestiary/environmental-hazards` without JavaScript. Confirm the HTML contains the visible H1, navigation, body copy, internal links, and route-specific metadata.
- [ ] **Code verified — ADS-PUB-05 / ADS-UX-05:** Confirm About, Contact, Privacy, Terms, and Copyright links appear in the initial footer HTML and each route returns HTTP 200.
- [ ] **Code verified — ADS-PUB-11 / ADS-PROG-06:** Confirm `/search` has `noindex, follow`, is absent from `sitemap.xml`, and loads neither affiliate banner placements nor the affiliate popunder.
- [ ] **Code verified — ADS-PRIV-01 / ADS-PRIV-02:** Confirm the live Privacy Policy explains hosting logs, Analytics, Google and third-party advertising cookies or identifiers, affiliate advertising, consent controls, and contact handling.
- [ ] **Code verified — fingerprint removal:** Confirm neither page source nor network requests reference `/collet-data.js` or `api.sdfgame.com/collect/api/report`.
- [ ] **Code verified — sampled content depth:** Confirm each of the four report-sampled content pages contains 800–1500 visible English words.
- [ ] **Code verified — metadata:** Confirm representative home, item, area, bestiary, guide, search, and legal routes have unique titles, descriptions, canonicals, robots directives, social metadata, and JSON-LD in the initial HTML.

## Account and ownership checks

- [ ] **Owner check — ADS-ELIG-01:** The AdSense account holder is at least 18, or the account is managed by an eligible parent or guardian.
- [ ] **Owner check — ADS-ELIG-02:** The publisher has only one AdSense account. Add this domain to the existing account instead of opening a duplicate account.
- [ ] **Owner check — ADS-OWN-01:** Confirm the deployed site can receive the verification code or meta tag in every page head. Static generation now supports this technically.
- [ ] **Owner check — ADS-OWN-02:** Confirm the domain registration and DNS zone are controlled by the applicant.
- [ ] **Owner check — ADS-SITE-01:** In AdSense → Sites, confirm `burglin-gnomes.org` is added, verified, and shows the intended review/approval state.
- [ ] **Owner check — ADS-SITE-02:** Confirm the ownership method requested by AdSense is present: site code, meta tag, or `ads.txt`.

## Advertising and traffic checks

- [ ] **Owner check — ADS-PROG-01:** Never click the site's own ads and never ask testers, friends, contractors, or automated tools to generate clicks or impressions.
- [ ] **Owner check — ADS-PROG-03 / ADS-UX-06:** Review desktop and mobile ad rendering. Ads must be visually separated from navigation and controls and use a neutral Advertisement label.
- [ ] **Owner check — ADS-PROG-04:** Review Analytics and referral reports for paid-to-click traffic, traffic exchanges, spam email, automated traffic, or comment spam. Stop any questionable source before review.
- [ ] **Owner check — ADS-PUB-10 / ADS-REST-08:** Confirm affiliate and future Google ads do not cover navigation, block content, create a dead-end screen, or behave like prohibited floating video.
- [ ] **Owner check — ADS-PUB-12:** Confirm ads appear only alongside the intended page content, not in background tabs, hidden frames, email, or unrelated third-party embeds.

## Privacy and consent checks

- [ ] **Owner check — ADS-PRIV-03:** Inspect URLs, analytics events, data-layer values, and future ad targeting parameters. Do not pass email addresses, phone numbers, account names, or other PII to an ad request.
- [ ] **Owner check — ADS-PRIV-04:** If the site receives visitors from the EEA, United Kingdom, or Switzerland, activate a Google-certified CMP and configure the required Google consent framework before personalized ads or non-essential advertising storage.
- [ ] **Owner check — ADS-PRIV-05:** The current site does not request precise location. If a future feature adds it, obtain explicit consent and update the Privacy Policy first.
- [ ] **Owner check — ADS-PRIV-07:** Do not proxy, rewrite, or attempt to set cookies on a Google-owned domain.
- [ ] **Owner check — ADS-PRIV-08:** Do not create advertising audiences from health, religion, sexual orientation, or other sensitive categories.
- [ ] **Owner check — ADS-PRIV-09:** If housing, employment, or credit campaigns are ever purchased in the United States or Canada, do not target them using prohibited protected-class attributes.
- [ ] **Owner check — ADS-PRIV-10:** Before enabling personalized advertising, confirm the site has the required consent and data-use rights and that the live disclosure matches the enabled vendors.

## Final submission gate

- [ ] All automated build and AdSense hardening checks pass on the exact production commit.
- [ ] Vercel reports the production deployment as ready.
- [ ] Representative routes return HTTP 200 and contain full initial HTML without JavaScript.
- [ ] Google Search Console sitemap contains the intended content routes and excludes `/search`.
- [ ] The owner-only account, traffic, advertising-layout, and CMP checks above are complete.
