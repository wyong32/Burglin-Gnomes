import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import areasData from '../src/data/areasData.js'
import enemiesData from '../src/data/enemiesData.js'
import itemsData from '../src/data/itemsData.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

const areas = areasData.find((section) => section.key === 'areas')?.items ?? []
const bestiaryEntries = enemiesData.find((section) => section.key === 'entries')?.items ?? []
const items = itemsData.find((section) => section.key === 'items')?.items ?? []
if (!areas.find((entry) => entry.slug === 'bathroom')?.deepDiveSections?.length) {
  fail('Bathroom deep-dive content is missing from the bathroom record')
}
if (areas.find((entry) => entry.slug === 'gnome-world')?.deepDiveSections?.length) {
  fail('Bathroom deep-dive content must not appear on the gnome-world record')
}
if (!bestiaryEntries.find((entry) => entry.slug === 'environmental-hazards')?.deepDiveSections?.length) {
  fail('Environmental hazard deep-dive content is missing from the environmental-hazards record')
}
if (bestiaryEntries.find((entry) => entry.slug === 'high-gnome')?.deepDiveSections?.length) {
  fail('Environmental hazard deep-dive content must not appear on the high-gnome record')
}
for (const slug of ['rocket-launcher', 'stamina-dart']) {
  if (!items.find((entry) => entry.slug === slug)?.contentExpansionSections?.length) {
    fail(`${slug} content-expansion sections are missing from the item record`)
  }
}
const expandedItemSlugs = items.filter((entry) => Object.hasOwn(entry, 'contentExpansionSections')).map((entry) => entry.slug)
if (JSON.stringify(expandedItemSlugs.sort()) !== JSON.stringify(['rocket-launcher', 'stamina-dart'])) {
  fail(`Only the two approved item records may expose contentExpansionSections; found ${expandedItemSlugs.join(', ')}`)
}
if (!areas.find((entry) => entry.slug === 'outdoor-lawn')?.contentExpansionSections?.length) {
  fail('Outdoor Lawn content-expansion sections are missing from the outdoor-lawn record')
}

function fail(message) {
  failures.push(message)
}

function read(relativePath) {
  const absolutePath = path.join(rootDir, relativePath)
  return fs.existsSync(absolutePath) ? fs.readFileSync(absolutePath, 'utf8') : null
}

function hashFile(relativePath) {
  const bytes = fs.readFileSync(path.join(rootDir, relativePath))
  return crypto.createHash('sha256').update(bytes).digest('hex')
}

function walk(relativeDirectory) {
  const absoluteDirectory = path.join(rootDir, relativeDirectory)
  if (!fs.existsSync(absoluteDirectory)) return []

  return fs.readdirSync(absoluteDirectory, { withFileTypes: true }).flatMap((entry) => {
    const relativePath = path.join(relativeDirectory, entry.name)
    return entry.isDirectory() ? walk(relativePath) : [relativePath]
  })
}

function decodeHtml(text) {
  const entities = {
    amp: '&',
    apos: "'",
    gt: '>',
    lt: '<',
    nbsp: ' ',
    quot: '"',
  }

  return text
    .replace(/&#(\d+);/g, (_, value) => String.fromCodePoint(Number(value)))
    .replace(/&#x([\da-f]+);/gi, (_, value) => String.fromCodePoint(Number.parseInt(value, 16)))
    .replace(/&([a-z]+);/gi, (match, name) => entities[name.toLowerCase()] ?? match)
}

function visibleText(html) {
  return decodeHtml(
    html
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
      .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
      .replace(/<[^>]+>/g, ' '),
  ).replace(/\s+/g, ' ')
}

function wordCount(html) {
  return visibleText(html).match(/[A-Za-z0-9]+(?:['’-][A-Za-z0-9]+)*/g)?.length ?? 0
}

function headings(html) {
  return [...html.matchAll(/<h([1-3])\b[^>]*>([\s\S]*?)<\/h\1>/gi)].map((match) => [
    Number(match[1]),
    visibleText(match[2]).trim(),
  ])
}

function outputPath(routePath) {
  if (routePath === '/') return 'dist/index.html'
  return `dist/${routePath.replace(/^\/+|\/+$/g, '')}/index.html`
}

const manifest = JSON.parse(read('scripts/ads-protected-manifest.json'))
for (const [relativePath, expectedHash] of Object.entries(manifest.files)) {
  if (!read(relativePath)) {
    fail(`Protected file is missing: ${relativePath}`)
    continue
  }
  const actualHash = hashFile(relativePath)
  if (actualHash !== expectedHash) {
    fail(`Protected file changed: ${relativePath} (${actualHash})`)
  }
}

const fingerprintPatterns = [/collet-data\.js/i, /api\.sdfgame\.com\/collect\/api\/report/i]
for (const relativePath of ['index.html', ...walk('src'), ...walk('public')]) {
  const content = read(relativePath)
  if (content && fingerprintPatterns.some((pattern) => pattern.test(content))) {
    fail(`Fingerprint collector reference remains in ${relativePath}`)
  }
}

const sitemap = read('public/sitemap.xml') ?? ''
if (/<loc>https:\/\/burglin-gnomes\.org\/search<\/loc>/.test(sitemap)) {
  fail('/search must not appear in public/sitemap.xml')
}

const expectedAdsTxt = 'google.com, pub-9151036466808188, DIRECT, f08c47fec0942fa0\n'
const adsTxt = read('public/ads.txt') ?? ''
if (adsTxt !== expectedAdsTxt) {
  fail('public/ads.txt must contain only the approved pub-9151036466808188 authorization line')
}
if (adsTxt.includes('pub-9435047454967498')) {
  fail('The previous AdSense publisher ID must not remain in public/ads.txt')
}

const generatedHtmlFiles = walk('dist').filter((relativePath) => relativePath.endsWith('.html'))
if (generatedHtmlFiles.length !== 138) {
  fail(`Expected 138 generated HTML files, found ${generatedHtmlFiles.length}`)
}

const allGeneratedTitles = new Map()
const allGeneratedCanonicals = new Map()
for (const relativePath of generatedHtmlFiles) {
  const html = read(relativePath)
  const title = decodeHtml(html?.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '')
  const canonical = html?.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)/i)?.[1] ?? ''
  const h1Count = html?.match(/<h1\b/gi)?.length ?? 0
  const words = html ? wordCount(html) : 0

  if (!title) fail(`Generated HTML is missing a title: ${relativePath}`)
  else if (allGeneratedTitles.has(title)) {
    fail(`Generated title is duplicated by ${relativePath} and ${allGeneratedTitles.get(title)}: ${title}`)
  } else allGeneratedTitles.set(title, relativePath)

  if (!canonical) fail(`Generated HTML is missing a canonical: ${relativePath}`)
  else if (allGeneratedCanonicals.has(canonical)) {
    fail(`Generated canonical is duplicated by ${relativePath} and ${allGeneratedCanonicals.get(canonical)}: ${canonical}`)
  } else allGeneratedCanonicals.set(canonical, relativePath)

  if (h1Count !== 1) fail(`Generated HTML must contain one H1: ${relativePath} has ${h1Count}`)
  if (words < 50) fail(`Generated HTML must contain meaningful visible text: ${relativePath} has ${words} words`)
}

const representativeRoutes = [
  '/',
  '/items/spoon',
  '/items/sleep-dart',
  '/areas/bathroom',
  '/bestiary/environmental-hazards',
  '/search',
  '/legal/privacy-policy',
  '/legal/terms-of-service',
  '/legal/copyright',
  '/legal/about-us',
  '/legal/contact-us',
]
const titles = new Map()

for (const routePath of representativeRoutes) {
  const relativePath = outputPath(routePath)
  const html = read(relativePath)
  if (!html) {
    fail(`Missing generated route HTML: ${routePath} (${relativePath})`)
    continue
  }

  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? '')
  if (!title) fail(`Missing title: ${routePath}`)
  if (titles.has(title)) fail(`Duplicate title for ${routePath} and ${titles.get(title)}: ${title}`)
  titles.set(title, routePath)

  if (!/<meta\s+name=["']description["']\s+content=["'][^"']+/i.test(html)) {
    fail(`Missing description: ${routePath}`)
  }
  if (!/<link\s+rel=["']canonical["']\s+href=["']https:\/\/burglin-gnomes\.org\//i.test(html)) {
    fail(`Missing canonical: ${routePath}`)
  }
  if (!/<meta\s+name=["']robots["']\s+content=["'][^"']+/i.test(html)) {
    fail(`Missing robots metadata: ${routePath}`)
  }
  if (!/<script\s+type=["']application\/ld\+json["']/i.test(html)) {
    fail(`Missing JSON-LD: ${routePath}`)
  }

  const h1Count = html.match(/<h1\b/gi)?.length ?? 0
  if (h1Count !== 1) fail(`Expected one H1 on ${routePath}, found ${h1Count}`)

  const internalLinks = html.match(/<a\b[^>]*href=["']\/(?!\/)/gi)?.length ?? 0
  if (internalLinks < 3) fail(`Expected at least 3 internal links on ${routePath}, found ${internalLinks}`)
}

const deepRoutes = [
  '/items/spoon',
  '/items/sleep-dart',
  '/items/rocket-launcher',
  '/items/stamina-dart',
  '/areas/bathroom',
  '/areas/outdoor-lawn',
  '/bestiary/environmental-hazards',
]
for (const routePath of deepRoutes) {
  const html = read(outputPath(routePath))
  if (!html) continue
  const words = wordCount(html)
  if (words < 800 || words > 1500) {
    fail(`${routePath} must contain 800–1500 visible words; found ${words}`)
  }
}

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

for (const [routePath, expectedPrefix] of Object.entries(preservedHeadings)) {
  const html = read(outputPath(routePath))
  if (!html) continue
  const actualPrefix = headings(html).slice(0, expectedPrefix.length)
  if (JSON.stringify(actualPrefix) !== JSON.stringify(expectedPrefix)) {
    fail(`${routePath} must preserve every legacy H1/H2/H3 as the exact heading prefix`)
  }
}

const disclosureFragments = [
  'independent, player-created guide',
  'not affiliated with, endorsed by, or operated by Fobri',
  'respective rights holders',
]
for (const routePath of ['/', '/legal/about-us']) {
  const html = read(outputPath(routePath))
  if (!html) continue
  const text = visibleText(html)
  for (const fragment of disclosureFragments) {
    if (!text.includes(fragment)) fail(`${routePath} is missing unofficial-fan disclosure text: ${fragment}`)
  }
}

const searchHtml = read(outputPath('/search'))
if (searchHtml && !/<meta\s+name=["']robots["']\s+content=["']noindex, follow["']/i.test(searchHtml)) {
  fail('/search must use noindex, follow')
}

const excludedAdRoutes = ['/search', ...representativeRoutes.filter((routePath) => routePath.startsWith('/legal/'))]
for (const routePath of excludedAdRoutes) {
  const html = read(outputPath(routePath))
  if (html && /class=["'][^"']*affiliate-ad/i.test(html)) {
    fail(`Affiliate banner markup must not render on ${routePath}`)
  }
}

const indexTemplate = read('index.html') ?? ''
const autoAdsUrl =
  'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-9151036466808188'
const autoAdsUrlCount = indexTemplate.split(autoAdsUrl).length - 1
if (autoAdsUrlCount !== 1) {
  fail(`The approved AdSense Auto Ads URL must appear exactly once in index.html; found ${autoAdsUrlCount}`)
}
if (!indexTemplate.includes('adsenseAutoAds.async = true')) {
  fail('The AdSense Auto Ads loader must load asynchronously')
}
if (!indexTemplate.includes("adsenseAutoAds.crossOrigin = 'anonymous'")) {
  fail('The AdSense Auto Ads loader must set anonymous cross-origin mode')
}
if (!indexTemplate.includes('document.head.appendChild(adsenseAutoAds)')) {
  fail('The AdSense Auto Ads loader must append its script to the document head')
}
if (!indexTemplate.includes("location.pathname !== '/search'")) {
  fail('Affiliate popunder loader must exclude /search')
}
if (!indexTemplate.includes("!location.pathname.startsWith('/legal/')")) {
  fail('Affiliate popunder loader must exclude /legal/*')
}

const activeIndexTemplate = indexTemplate.replace(/<!--[\s\S]*?-->/g, '')
for (const activeGptPattern of [
  'securepubads.g.doubleclick.net',
  'googletag.defineSlot',
  'googletag.defineOutOfPageSlot',
]) {
  if (activeIndexTemplate.includes(activeGptPattern)) {
    fail(`GPT must remain inactive outside HTML comments: ${activeGptPattern}`)
  }
}

if (failures.length) {
  console.error(`AdSense hardening check failed (${failures.length}):`)
  for (const failure of failures) console.error(`- ${failure}`)
  process.exit(1)
}

console.log('AdSense hardening check passed.')
for (const routePath of deepRoutes) {
  console.log(`${routePath}: ${wordCount(read(outputPath(routePath)))} words`)
}
