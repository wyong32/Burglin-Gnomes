import { createSSRApp } from 'vue'

import App from './App.vue'
import AdPlaceholder from './components/AdPlaceholder.vue'
import { createSiteRouter } from './router/index.js'

export function createSiteApp(history) {
  const app = createSSRApp(App)
  const router = createSiteRouter(history)

  app.component('AdPlaceholder', AdPlaceholder)
  app.use(router)

  return { app, router }
}
