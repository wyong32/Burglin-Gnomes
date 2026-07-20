import areasData from '../data/areasData.js'
import craftingData from '../data/craftingData.js'
import enemiesData from '../data/enemiesData.js'
import guidesData from '../data/guides.js'
import itemsData from '../data/itemsData.js'
import { getSectionItems } from '../utils/sectionData.js'
import { sitemapStaticRoutes } from './sitemapRoutes.js'

const searchRoute = { path: '/search', name: 'search' }

export function getPrerenderRoutes() {
  const staticRoutes = sitemapStaticRoutes.some((route) => route.path === searchRoute.path)
    ? sitemapStaticRoutes
    : [...sitemapStaticRoutes, searchRoute]

  const routes = [
    ...staticRoutes.map((route) => route.path),
    ...getSectionItems(itemsData, 'items').map((entry) => `/items/${entry.slug}`),
    ...getSectionItems(craftingData, 'recipes').map((entry) => `/crafting/${entry.slug}`),
    ...getSectionItems(areasData, 'areas').map((entry) => `/areas/${entry.slug}`),
    ...guidesData.filter((entry) => entry.addressBar).map((entry) => `/guides/${entry.addressBar}`),
    ...getSectionItems(enemiesData, 'entries').map((entry) => `/bestiary/${entry.slug}`),
  ]

  return [...new Set(routes)]
}
