import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router';

import {createPinia} from 'pinia'


// 本地SVG图标
import 'virtual:svg-icons-register';

// 样式
import 'element-plus/theme-chalk/dark/css-vars.css';
import '@/styles/index.scss';
import 'uno.css';

const app=createApp(App)
app.use(createPinia())

app.use(router)

app.mount('#app')
