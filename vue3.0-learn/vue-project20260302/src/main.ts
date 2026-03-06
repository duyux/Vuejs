import { createApp } from 'vue'
import App from './App.vue'


import VxeUITable from 'vxe-table'
import 'vxe-table/lib/style.css'

import i18nPlugin from './plugins/i18n'
   
createApp(App)
   .use(VxeUITable)
   .use(i18nPlugin,{
        greetings:{
            hello:'Bonjour!'
        }
   })
  .mount('#app')


