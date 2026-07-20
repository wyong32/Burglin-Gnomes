import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import areasData from '../src/data/areasData.js'
import enemiesData from '../src/data/enemiesData.js'

const rootDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const failures = []

const areas = areasData.find((section) => section.key === 'areas')?.items ?? []
const bestiaryEntries = enemiesData.find((section) => section.key === 'entries')?.items ?? []
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
  '/areas/bathroom',
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
if (!indexTemplate.includes("location.pathname !== '/search'")) {
  fail('Affiliate popunder loader must exclude /search')
}
if (!indexTemplate.includes("!location.pathname.startsWith('/legal/')")) {
  fail('Affiliate popunder loader must exclude /legal/*')
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
