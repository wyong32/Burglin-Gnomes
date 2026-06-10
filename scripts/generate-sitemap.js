import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import craftingData from '../src/data/craftingData.js'
import enemiesData from '../src/data/enemiesData.js'
import itemsData from '../src/data/itemsData.js'
import { seoConfig } from '../src/seo/config.js'
import { sitemapStaticRoutes } from '../src/seo/sitemapRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fullDomain = seoConfig.fullDomain.replace(/\/+$/, '')

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

function urlNode(loc, lastmod, changefreq, priority) {
  const p = String(Math.round((priority ?? 0.7) * 100) / 100)
  return `  <url>
    <loc>${fullDomain}${loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${p}</priority>
  </url>`
}

function getSectionItems(data, key) {
  const section = data.find((entry) => entry.key === key)
  return section?.items ?? []
}

function generate() {
  const lastmod = new Date().toISOString().split('T')[0]

  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`

  for (const r of sitemapStaticRoutes) {
    xml += `\n${urlNode(r.path, lastmod, getChangefreq(r.name), getPriority(r.name))}`
  }

  for (const item of getSectionItems(itemsData, 'items')) {
    if (!item?.slug) continue
    const itemPath = `/items/${item.slug}`
    const date = coerceSitemapLastmod(item.updatedAt || item.datePublished, lastmod)
    xml += `\n${urlNode(itemPath, date, getChangefreq('item-detail'), getPriority('item-detail'))}`
  }

  for (const recipe of getSectionItems(craftingData, 'recipes')) {
    if (!recipe?.slug) continue
    const recipePath = `/crafting/${recipe.slug}`
    const date = coerceSitemapLastmod(recipe.updatedAt || recipe.datePublished, lastmod)
    xml += `\n${urlNode(recipePath, date, getChangefreq('crafting-detail'), getPriority('crafting-detail'))}`
  }

  for (const entry of getSectionItems(enemiesData, 'entries')) {
    if (!entry?.slug) continue
    const entryPath = `/bestiary/${entry.slug}`
    const date = coerceSitemapLastmod(entry.updatedAt || entry.datePublished, lastmod)
    xml += `\n${urlNode(entryPath, date, getChangefreq('bestiary-detail'), getPriority('bestiary-detail'))}`
  }

  xml += '\n</urlset>'

  const publicPath = path.join(__dirname, '../public/sitemap.xml')
  const publicDir = path.dirname(publicPath)
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true })
  }
  fs.writeFileSync(publicPath, xml, 'utf8')
  console.log('Sitemap written to public/sitemap.xml')

  const count = (xml.match(/<url>/g) || []).length
  console.log(`Total URLs: ${count} (${fullDomain})`)
}

generate()
