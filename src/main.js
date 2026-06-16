import { createApp } from 'vue'
import App from './App.vue'
import GptAd from './components/GptAd.vue'
import router from './router'
import './assets/global.css'

const app = createApp(App)

app.component('GptAd', GptAd)
app.use(router)

app.mount('#app')
