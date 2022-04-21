import Vue from 'vue'
import App from './App.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)

import Avue from '@smallwei/avue'
import '@smallwei/avue/lib/index.css'
Vue.use(Avue)

import AvueFormDesign from '@sscfaith/avue-form-design'
Vue.use(AvueFormDesign)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
