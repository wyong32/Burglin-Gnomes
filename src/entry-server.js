import { renderToString } from '@vue/server-renderer'
import { createMemoryHistory } from 'vue-router'

import { createSiteApp } from './createSiteApp.js'
import { resolveRouteDocument } from './seo/resolveRouteDocument.js'

export async function render(url) {
  const { app, router } = createSiteApp(createMemoryHistory(import.meta.env.BASE_URL))
  await router.push(url)
  await router.isReady()

  return {
    appHtml: await renderToString(app),
    seo: resolveRouteDocument(url),
  }
}
