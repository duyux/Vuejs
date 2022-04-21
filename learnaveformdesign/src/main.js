import Vue from 'vue'
import App from './App.vue'

//引入饿了组件
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import AVUE from '@smallwei/avue'
Vue.use(AVUE)

import AvueFormDesign from '@sscfaith/avue-form-design'

Vue.use(AvueFormDesign)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
