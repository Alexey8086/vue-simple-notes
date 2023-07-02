import { createApp } from 'vue'
import App from './App.vue'
import store from './store/index.js'
import router from './router/index.js'
import customLog from './globalFunctions/customLog'

// глобальные функции (выполняются только в режиме разработки)
window.customLog = customLog

const app = createApp(App)

app.use(store)
app.use(router)
app.mount("#app")
