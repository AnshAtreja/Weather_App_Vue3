import './assets/tailwind.css'
import { createApp } from 'vue'
import App from './App2.vue'
import router from './router'
import store from './store'

const app = createApp(App)

app.use(router)
app.use(store)

app.mount('#app')
