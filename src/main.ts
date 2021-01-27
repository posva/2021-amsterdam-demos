import { createApp } from 'vue'
import '@exampledev/new.css'
import { router } from './router'
import App from './App.vue'

const app = createApp(App)
app.use(router).mount('#app')
