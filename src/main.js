import { createApp } from 'vue'
import App from './App.vue'
import AffiliateAd from './components/AffiliateAd.vue'
import GptAd from './components/GptAd.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App)

app.component('GptAd', GptAd)
app.component('AffiliateAd', AffiliateAd)
app.use(router)

app.mount('#app')
