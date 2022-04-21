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

import CustomTimeline from './components/custom/timeline'
Vue.component(CustomTimeline.name, CustomTimeline)

// import CustomFields from './components/custom' //自定义组件多时可使用此方式批量注册组件
// Vue.use(CustomFields)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
