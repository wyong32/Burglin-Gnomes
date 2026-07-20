import areasData from '../data/areasData.js'
import craftingData from '../data/craftingData.js'
import enemiesData from '../data/enemiesData.js'
import guidesData from '../data/guides.js'
import itemsData from '../data/itemsData.js'
import { routeSeo } from '../router/routeSeo.js'
import { getSectionItems } from '../utils/sectionData.js'
import { seoConfig } from './config.js'
import {
  buildArticleJsonLd,
  buildDefaultWebPageJsonLd,
  buildHomeGraphJsonLd,
  resolveCanonicalUrl,
  toAbsoluteUrl,
} from './documentMeta.js'
import { sitemapStaticRoutes } from './sitemapRoutes.js'

const items = getSectionItems(itemsData, 'items')
const recipes = getSectionItems(craftingData, 'recipes')
const areas = getSectionItems(areasData, 'areas')
const bestiaryEntries = getSectionItems(enemiesData, 'entries')
const guides = guidesData.filter((entry) => entry.addressBar)

const staticRouteNames = new Map([
  ...sitemapStaticRoutes.map((route) => [route.path, route.name]),
  ['/search', 'search'],
])

function normalizePath(rawPath) {
  const pathname = String(rawPath || '/').split(/[?#]/, 1)[0] || '/'
  return pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname
}

function finalizeDocument({
  path,
  title,
  description,
  keywords,
  ogImage,
  ogType = 'website',
  robots = 'index, follow',
  jsonLd,
}) {
  const canonicalUrl = resolveCanonicalUrl(path)
  const resolvedTitle = title || seoConfig.defaults.title
  const resolvedDescription = description || seoConfig.defaults.description
  const resolvedImage = toAbsoluteUrl(ogImage || seoConfig.defaultOgImage)

  return {
    path,
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || seoConfig.defaults.keywords,
    author: seoConfig.defaults.author,
    canonicalUrl,
    robots,
    ogImage: resolvedImage,
    ogType,
    jsonLd:
      jsonLd ||
      buildDefaultWebPageJsonLd({
        name: resolvedTitle,
        description: resolvedDescription,
        url: canonicalUrl,
      }),
  }
}

function articleDocument(path, entry, { title, description, keywords, image, datePublished } = {}) {
  const resolvedTitle = title || entry.tdk?.title
  const resolvedDescription = description || entry.tdk?.description
  const resolvedImage = image || entry.image
  const canonicalUrl = resolveCanonicalUrl(path)

  return finalizeDocument({
    path,
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || entry.tdk?.keywords,
    ogImage: resolvedImage,
    ogType: 'article',
    jsonLd: buildArticleJsonLd({
      headline: resolvedTitle,
      description: resolvedDescription,
      url: canonicalUrl,
      imageUrl: resolvedImage,
      datePublished,
    }),
  })
}

export function resolveRouteDocument(rawPath) {
  const path = normalizePath(rawPath)
  const staticName = staticRouteNames.get(path)

  if (staticName) {
    const metadata = routeSeo[staticName] || seoConfig.defaults
    const canonicalUrl = resolveCanonicalUrl(path)
    return finalizeDocument({
      path,
      ...metadata,
      robots: path === '/search' ? 'noindex, follow' : 'index, follow',
      jsonLd:
        path === '/'
          ? buildHomeGraphJsonLd({
              name: metadata.title,
              description: metadata.description,
              url: canonicalUrl,
            })
          : undefined,
    })
  }

  if (path.startsWith('/items/')) {
    const entry = items.find((item) => item.slug === path.slice('/items/'.length))
    if (entry) return articleDocument(path, entry)
  }

  if (path.startsWith('/crafting/')) {
    const entry = recipes.find((item) => item.slug === path.slice('/crafting/'.length))
    if (entry) return articleDocument(path, entry)
  }

  if (path.startsWith('/areas/')) {
    const entry = areas.find((item) => item.slug === path.slice('/areas/'.length))
    if (entry) return articleDocument(path, entry)
  }

  if (path.startsWith('/bestiary/')) {
    const entry = bestiaryEntries.find((item) => item.slug === path.slice('/bestiary/'.length))
    if (entry) return articleDocument(path, entry)
  }

  if (path.startsWith('/guides/')) {
    const entry = guides.find((item) => item.addressBar === path.slice('/guides/'.length))
    if (entry) {
      return articleDocument(path, entry, {
        title: entry.seo?.title || `${entry.title} | Burglin' Gnomes`,
        description: entry.seo?.description || entry.description,
        keywords: entry.seo?.keywords,
        image: entry.imageUrl,
        datePublished: entry.publishDate,
      })
    }
  }

  throw new Error(`No SEO document is defined for route: ${path}`)
}
