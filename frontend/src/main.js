import { createSSRApp } from 'vue'
import uviewPlus from 'uview-plus'

import App from './App.vue'
import { createPinia } from './store/index.js'

import './styles/common.scss'

export function createApp() {
  const app = createSSRApp(App)
  app.use(createPinia())
  app.use(uviewPlus)

  return {
    app,
  }
}
