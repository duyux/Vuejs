import './assets/main.css'
import 'normalize.css'
//通用字体
import 'vfonts/Lato.css'
//等宽字体
import 'vfonts/FiraCode.css'
import i18n from './lang/index'

import { createApp } from 'vue'
import App from './App.vue'

const app=createApp(App)

app.use(i18n)
app.mount('#app')
