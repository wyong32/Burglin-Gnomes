import crypto from 'node:crypto'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import areasData from '../src/data/areasData.js'
import craftingData from '../src/data/craftingData.js'
import enemiesData from '../src/data/enemiesData.js'
import guidesData from '../src/data/guides.js'
import itemsData from '../src/data/itemsData.js'
import { seoConfig } from '../src/seo/config.js'
import { sitemapStaticRoutes } from '../src/seo/sitemapRoutes.js'
import { getSectionItems } from '../src/utils/sectionData.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.join(__dirname, '..')
const statePath = path.join(__dirname, '.sitemap-state.json')
const sitemapPath = path.join(rootDir, 'public/sitemap.xml')

const fullDomain = seoConfig.fullDomain.replace(/\/+$/, '')

const staticSourceMap = {
  '/': ['src/views/HomeView.vue'],
  '/wiki': ['src/views/WikiView.vue', 'src/data/areasData.js'],
  '/guides': ['src/views/GuidesView.vue', 'src/data/guides.js'],
  '/beginner': ['src/views/BeginnerGuideView.vue', 'src/data/beginnerData.js'],
  '/items': ['src/views/ItemsView.vue', 'src/data/itemsData.js'],
  '/crafting': ['src/views/CraftingView.vue', 'src/data/craftingData.js'],
  '/base-building': [
    'src/views/BaseBuildingView.vue',
    'src/data/baseData.js',
    'src/data/areasData.js',
  ],
  '/bestiary': ['src/views/EnemiesView.vue', 'src/data/enemiesData.js'],
  '/updates': ['src/views/UpdatesView.vue'],
  '/legal/privacy-policy': ['src/views/Legal/PrivacyPolicyView.vue'],
  '/legal/terms-of-service': ['src/views/Legal/TermsOfServiceView.vue'],
  '/legal/copyright': ['src/views/Legal/CopyrightView.vue'],
  '/legal/about-us': ['src/views/Legal/AboutUsView.vue'],
  '/legal/contact-us': ['src/views/Legal/ContactUsView.vue'],
}

function getPriority(name) {
  return (seoConfig.priorities && seoConfig.priorities[name]) ?? 0.7
}

function getChangefreq(name) {
  return (seoConfig.changefreq && seoConfig.changefreq[name]) ?? 'monthly'
}

function coerceSitemapLastmod(raw, fallback) {
  const s = raw == null ? '' : String(raw).trim()
  if (/^\d{4}-\d{2}-\d{2}(?:T[\d:Z.+-]*)?$/.test(s)) return s.slice(0, 10)
  const t = Date.parse(s)
  if (!Number.isNaN(t)) return new Date(t).toISOString().slice(0, 10)
  return fallback
}

function readFileSafe(relativePath) {
  const full = path.join(rootDir, relativePath)
  if (!fs.existsSync(full)) return ''
  return fs.readFileSync(full, 'utf8')
}

function hashContent(...parts) {
  const hash = crypto.createHash('sha256')
  for (const part of parts) {
    if (part == null) continue
    hash.update(typeof part === 'string' ? part : JSON.stringify(part))
  }
  return hash.digest('hex').slice(0, 16)
}

function hashFiles(...relativePaths) {
  return hashContent(...relativePaths.map(readFileSafe))
}

function hashEntry(entry, ...relativePaths) {
  return hashContent(JSON.stringify(entry), ...relativePaths.map(readFileSafe))
}

function parseSitemap(xml) {
  const map = new Map()
  const urlBlocks = xml.match(/<url>[\s\S]*?<\/url>/g) || []

  for (const block of urlBlocks) {
    const loc = block.match(/<loc>([^<]+)<\/loc>/)?.[1]
    const lastmod = block.match(/<lastmod>([^<]+)<\/lastmod>/)?.[1]
    if (!loc || !lastmod) continue

    let urlPath = loc.replace(fullDomain, '') || '/'
    if (!urlPath.startsWith('/')) urlPath = `/${urlPath}`
    map.set(urlPath, coerceSitemapLastmod(lastmod, ''))
  }

  return map
}

function loadState() {
  if (fs.existsSync(statePath)) {
    return JSON.parse(fs.readFileSync(statePath, 'utf8'))
  }

  const state = { version: 1, urls: {} }

  if (fs.existsSync(sitemapPath)) {
    const fromSitemap = parseSitemap(fs.readFileSync(sitemapPath, 'utf8'))
    for (const [urlPath, lastmod] of fromSitemap) {
      state.urls[urlPath] = { hash: null, lastmod }
    }
  }

  return state
}

function resolveLastmod(urlPath, contentHash, state, today, stats) {
  const prev = state.urls[urlPath]

  if (!prev) {
    state.urls[urlPath] = { hash: contentHash, lastmod: today }
    stats.new += 1
    return today
  }

  if (prev.hash === null) {
    state.urls[urlPath] = { hash: contentHash, lastmod: prev.lastmod }
    stats.bootstrapped += 1
    return prev.lastmod
  }

  if (prev.hash !== contentHash) {
    state.urls[urlPath] = { hash: contentHash, lastmod: today }
    stats.updated += 1
    return today
  }

  stats.unchanged += 1
  return prev.lastmod
}

function urlNode(loc, lastmod, changefreq, priority) {
  const p = String(Math.round((priority ?? 0.7) * 100) / 100)
  return `  <url>
    <loc>${fullDomain}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${p}</priority>
  </url>`
}

function generate() {
  const today = new Date().toISOString().slice(0, 10)
  const state = loadState()
  const stats = { new: 0, updated: 0, unchanged: 0, bootstrapped: 0, removed: 0 }
  const activePaths = new Set()

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const r of sitemapStaticRoutes) {
    const sources = staticSourceMap[r.path] ?? []
    const contentHash = hashFiles(...sources)
    const date = resolveLastmod(r.path, contentHash, state, today, stats)
    activePaths.add(r.path)
    xml += `\n${urlNode(r.path, date, getChangefreq(r.name), getPriority(r.name))}`
  }

  for (const item of getSectionItems(itemsData, 'items')) {
    if (!item?.slug) continue
    const itemPath = `/items/${item.slug}`
    const contentHash = hashEntry(item, 'src/views/ItemDetailView.vue', 'src/utils/contentLabels.js')
    const date = resolveLastmod(itemPath, contentHash, state, today, stats)
    activePaths.add(itemPath)
    xml += `\n${urlNode(itemPath, date, getChangefreq('item-detail'), getPriority('item-detail'))}`
  }

  for (const recipe of getSectionItems(craftingData, 'recipes')) {
    if (!recipe?.slug) continue
    const recipePath = `/crafting/${recipe.slug}`
    const contentHash = hashEntry(recipe, 'src/views/CraftingDetailView.vue', 'src/utils/contentLabels.js')
    const date = resolveLastmod(recipePath, contentHash, state, today, stats)
    activePaths.add(recipePath)
    xml += `\n${urlNode(recipePath, date, getChangefreq('crafting-detail'), getPriority('crafting-detail'))}`
  }

  for (const area of getSectionItems(areasData, 'areas')) {
    if (!area?.slug) continue
    const areaPath = `/areas/${area.slug}`
    const contentHash = hashEntry(area, 'src/views/AreaDetailView.vue', 'src/utils/contentLabels.js')
    const date = resolveLastmod(areaPath, contentHash, state, today, stats)
    activePaths.add(areaPath)
    xml += `\n${urlNode(areaPath, date, getChangefreq('area-detail'), getPriority('area-detail'))}`
  }

  for (const guide of guidesData.filter((entry) => entry.addressBar)) {
    const guidePath = `/guides/${guide.addressBar}`
    const contentHash = hashEntry(guide, 'src/views/GuideDetailView.vue')
    const date = resolveLastmod(guidePath, contentHash, state, today, stats)
    activePaths.add(guidePath)
    xml += `\n${urlNode(guidePath, date, getChangefreq('guide-detail'), getPriority('guide-detail'))}`
  }

  for (const entry of getSectionItems(enemiesData, 'entries')) {
    if (!entry?.slug) continue
    const entryPath = `/bestiary/${entry.slug}`
    const contentHash = hashEntry(entry, 'src/views/BestiaryDetailView.vue', 'src/utils/contentLabels.js')
    const date = resolveLastmod(entryPath, contentHash, state, today, stats)
    activePaths.add(entryPath)
    xml += `\n${urlNode(entryPath, date, getChangefreq('bestiary-detail'), getPriority('bestiary-detail'))}`
  }

  for (const urlPath of Object.keys(state.urls)) {
    if (!activePaths.has(urlPath)) {
      delete state.urls[urlPath]
      stats.removed += 1
    }
  }

  xml += '\n</urlset>'

  const publicDir = path.dirname(sitemapPath)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }

  fs.writeFileSync(sitemapPath, xml, 'utf8')
  fs.writeFileSync(statePath, `${JSON.stringify(state, null, 2)}\n`, 'utf8')

  const count = (xml.match(/<url>/g) || []).length
  console.log('Sitemap written to public/sitemap.xml')
  console.log(`Total URLs: ${count} (${fullDomain})`)
  console.log(
    `Lastmod: ${stats.new} new, ${stats.updated} updated, ${stats.unchanged} unchanged` +
      (stats.bootstrapped ? `, ${stats.bootstrapped} bootstrapped from existing sitemap` : '') +
      (stats.removed ? `, ${stats.removed} removed` : ''),
  )
}

generate()
