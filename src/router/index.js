import { createRouter, createWebHistory } from 'vue-router'
import AreaDetailView from '../views/AreaDetailView.vue'
import BaseBuildingView from '../views/BaseBuildingView.vue'
import BeginnerGuideView from '../views/BeginnerGuideView.vue'
import BestiaryDetailView from '../views/BestiaryDetailView.vue'
import CraftingView from '../views/CraftingView.vue'
import CraftingDetailView from '../views/CraftingDetailView.vue'
import EnemiesView from '../views/EnemiesView.vue'
import HomeView from '../views/HomeView.vue'
import SearchView from '../views/SearchView.vue'
import ItemDetailView from '../views/ItemDetailView.vue'
import ItemsView from '../views/ItemsView.vue'
import AboutUsView from '../views/Legal/AboutUsView.vue'
import ContactUsView from '../views/Legal/ContactUsView.vue'
import CopyrightView from '../views/Legal/CopyrightView.vue'
import PrivacyPolicyView from '../views/Legal/PrivacyPolicyView.vue'
import TermsOfServiceView from '../views/Legal/TermsOfServiceView.vue'
import UpdatesView from '../views/UpdatesView.vue'
import WikiView from '../views/WikiView.vue'

import areasData from '../data/areasData.js'
import craftingData from '../data/craftingData.js'
import enemiesData from '../data/enemiesData.js'
import itemsData from '../data/itemsData.js'
import { seoConfig } from '../seo/config.js'
import {
  applyDocumentSeo,
  buildArticleJsonLd,
  buildHomeGraphJsonLd,
  resolveCanonicalUrl,
} from '../seo/documentMeta.js'
import { getSectionItems } from '../utils/sectionData.js'
import { routeSeo } from './routeSeo.js'

function routeMeta(pageKey) {
  return routeSeo[pageKey] ?? {}
}

const items = getSectionItems(itemsData, 'items')
const recipes = getSectionItems(craftingData, 'recipes')
const bestiaryEntries = getSectionItems(enemiesData, 'entries')
const areaEntries = getSectionItems(areasData, 'areas')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      }
    }
    return { top: 0 }
  },
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: routeMeta('home'),
    },
    {
      path: '/search',
      name: 'search',
      component: SearchView,
      meta: routeMeta('search'),
    },
    {
      path: '/wiki',
      name: 'wiki',
      component: WikiView,
      meta: routeMeta('wiki'),
    },
    {
      path: '/beginner',
      name: 'beginner',
      component: BeginnerGuideView,
      meta: routeMeta('beginner'),
    },
    {
      path: '/items',
      name: 'items',
      component: ItemsView,
      meta: routeMeta('items'),
    },
    { path: '/items/:slug', name: 'item-detail', component: ItemDetailView },
    {
      path: '/crafting',
      name: 'crafting',
      component: CraftingView,
      meta: routeMeta('crafting'),
    },
    { path: '/crafting/:slug', name: 'crafting-detail', component: CraftingDetailView },
    {
      path: '/base-building',
      name: 'base-building',
      component: BaseBuildingView,
      meta: routeMeta('base-building'),
    },
    { path: '/areas/:slug', name: 'area-detail', component: AreaDetailView },
    {
      path: '/bestiary',
      name: 'bestiary',
      component: EnemiesView,
      meta: routeMeta('bestiary'),
    },
    { path: '/bestiary/:slug', name: 'bestiary-detail', component: BestiaryDetailView },
    {
      path: '/updates',
      name: 'updates',
      component: UpdatesView,
      meta: routeMeta('updates'),
    },
    {
      path: '/legal/privacy-policy',
      name: 'legal-privacy',
      component: PrivacyPolicyView,
      meta: routeMeta('legal-privacy'),
    },
    {
      path: '/legal/terms-of-service',
      name: 'legal-terms',
      component: TermsOfServiceView,
      meta: routeMeta('legal-terms'),
    },
    {
      path: '/legal/copyright',
      name: 'legal-copyright',
      component: CopyrightView,
      meta: routeMeta('legal-copyright'),
    },
    {
      path: '/legal/about-us',
      name: 'legal-about',
      component: AboutUsView,
      meta: routeMeta('legal-about'),
    },
    {
      path: '/legal/contact-us',
      name: 'legal-contact',
      component: ContactUsView,
      meta: routeMeta('legal-contact'),
    },
    { path: '/beginner-guide', redirect: '/beginner' },
    { path: '/tasks', redirect: '/beginner#first-tasks' },
    { path: '/enemies', redirect: '/bestiary' },
    { path: '/bestiary/scrapling', redirect: '/items/scraplings' },
    { path: '/bestiary/scraplings', redirect: '/items/scraplings' },
    { path: '/items/scrapling', redirect: '/items/scraplings' },
    { path: '/items/bee', redirect: '/bestiary/bee' },
    { path: '/items/metal', redirect: '/items/clonk' },
    { path: '/items/ceramics', redirect: '/items/fraggles' },
    { path: '/bestiary/bibi', redirect: '/bestiary/tall-humanoid' },
    { path: '/bestiary/mole', redirect: '/bestiary/groundhog' },
    { path: '/bestiary/roomba', redirect: '/bestiary/vacuum-robot' },
    { path: '/full-release', redirect: '/updates' },
  ],
})

router.beforeEach((to) => {
  if (to.path.length > 1 && to.path.endsWith('/')) {
    return {
      path: to.path.replace(/\/+$/, ''),
      query: to.query,
      hash: to.hash,
      replace: true,
    }
  }

  const slug = to.params.slug

  if (to.name === 'item-detail' && slug && !items.some((entry) => entry.slug === slug)) {
    return { path: '/items', replace: true }
  }

  if (to.name === 'crafting-detail' && slug && !recipes.some((entry) => entry.slug === slug)) {
    return { path: '/crafting', replace: true }
  }

  if (to.name === 'bestiary-detail' && slug && !bestiaryEntries.some((entry) => entry.slug === slug)) {
    return { path: '/bestiary', replace: true }
  }

  if (to.name === 'area-detail' && slug && !areaEntries.some((entry) => entry.slug === slug)) {
    return { path: '/base-building', replace: true }
  }
})

router.afterEach((to) => {
  if (to.name === 'item-detail') {
    const item = items.find((entry) => entry.slug === to.params.slug)
    if (!item) return

    const path = `/items/${item.slug}`
    applyDocumentSeo({
      path,
      ...item.tdk,
      ogImage: item.image,
      ogType: 'article',
      jsonLd: buildArticleJsonLd({
        headline: item.tdk.title,
        description: item.tdk.description,
        url: resolveCanonicalUrl(path),
        imageUrl: item.image,
      }),
    })
    return
  }

  if (to.name === 'crafting-detail') {
    const recipe = recipes.find((entry) => entry.slug === to.params.slug)
    if (!recipe) return

    const path = `/crafting/${recipe.slug}`
    applyDocumentSeo({
      path,
      ...recipe.tdk,
      ogImage: recipe.image,
      ogType: 'article',
      jsonLd: buildArticleJsonLd({
        headline: recipe.tdk.title,
        description: recipe.tdk.description,
        url: resolveCanonicalUrl(path),
        imageUrl: recipe.image,
      }),
    })
    return
  }

  if (to.name === 'bestiary-detail') {
    const entry = bestiaryEntries.find((item) => item.slug === to.params.slug)
    if (!entry) return

    const path = `/bestiary/${entry.slug}`
    applyDocumentSeo({
      path,
      ...entry.tdk,
      ogImage: entry.image,
      ogType: 'article',
      jsonLd: buildArticleJsonLd({
        headline: entry.tdk.title,
        description: entry.tdk.description,
        url: resolveCanonicalUrl(path),
        imageUrl: entry.image,
      }),
    })
    return
  }

  if (to.name === 'area-detail') {
    const area = areaEntries.find((item) => item.slug === to.params.slug)
    if (!area) return

    const path = `/areas/${area.slug}`
    applyDocumentSeo({
      path,
      ...area.tdk,
      ogImage: area.image,
      ogType: 'article',
      jsonLd: buildArticleJsonLd({
        headline: area.tdk.title,
        description: area.tdk.description,
        url: resolveCanonicalUrl(path),
        imageUrl: area.image,
      }),
    })
    return
  }

  const title = to.meta?.title ?? seoConfig.defaults.title
  const description = to.meta?.description || seoConfig.defaults.description
  const canonicalPath = to.path

  applyDocumentSeo({
    path: canonicalPath,
    title,
    description,
    keywords: to.meta?.keywords || seoConfig.defaults.keywords,
    ogImage: to.meta?.ogImage,
    jsonLd:
      to.name === 'home'
        ? buildHomeGraphJsonLd({
            name: title,
            description,
            url: resolveCanonicalUrl(canonicalPath),
          })
        : undefined,
  })
})

export default router
