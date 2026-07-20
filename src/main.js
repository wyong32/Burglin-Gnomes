import { createWebHistory } from 'vue-router'

import { createSiteApp } from './createSiteApp.js'
import './assets/global.css'

const { app, router } = createSiteApp(createWebHistory(import.meta.env.BASE_URL))

router.isReady().then(() => app.mount('#app'))
