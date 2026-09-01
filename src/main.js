import { createApp } from 'vue'
import { createHead } from '@unhead/vue/client'
import App from './App.vue'
import router from './router'
const head = createHead()

import './assets/styles/reset.css'
import './assets/styles/variables.css'
import './assets/styles/main.css'

const app = createApp(App)

app.use(router)
app.use(head)

app.mount('#app')
