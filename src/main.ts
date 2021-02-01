import { createApp } from 'vue'
import '@exampledev/new.css'
import { router } from './router'
import App from './App.vue'
import { storePlugin } from './composables/store'

const app = createApp(App)
app.use(router).use(storePlugin).mount('#app')
