import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from './router/index'
import locale from 'element-plus/lib/locale/lang/zh-cn'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as Icons from '@element-plus/icons-vue'
import commonJs from './assets/js/common'

const app=createApp(App)
for(let i in Icons){
    app.component(i,Icons[i])
}
app.use(router).use(ElementPlus,{locale})
//vue3 中没有 Prototype 属性，使用 app.config.globalProperties 去替代
app.config.globalProperties.$commonJs=commonJs  
app.mount('#app')
