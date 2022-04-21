import Vue from 'vue'
import App from './App.vue'
import store from './store'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI, {
  size: 'mini'
})

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
Vue.use(Avue, {
  size: 'mini'
})

import AvueFormDesign from '@sscfaith/avue-form-design'
Vue.use(AvueFormDesign)

Vue.config.productionTip = false

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')
