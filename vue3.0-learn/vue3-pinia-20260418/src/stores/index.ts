import {createPinia} from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia=createPinia()
pinia.use(piniaPluginPersistedstate)

export * from './modules/user'
export * from './modules/app'
export * from './modules/counter'


export default pinia
