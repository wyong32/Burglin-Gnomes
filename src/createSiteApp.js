import { createSSRApp } from 'vue'

import App from './App.vue'
import AffiliateAd from './components/AffiliateAd.vue'
import GptAd from './components/GptAd.vue'
import { createSiteRouter } from './router/index.js'

export function createSiteApp(history) {
  const app = createSSRApp(App)
  const router = createSiteRouter(history)

  app.component('AffiliateAd', AffiliateAd)
  app.component('GptAd', GptAd)
  app.use(router)

  return { app, router }
}
