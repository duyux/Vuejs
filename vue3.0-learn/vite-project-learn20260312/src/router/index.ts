import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

// import Home from '../views/Home.vue'
// import About from '../views/About.vue'
// import NotFound from '../views/NotFound.vue'
const routes: RouteRecordRaw[] = [
    {
        path: '/',
        redirect: '/Home',
    },
    {
        name: 'home',
        path: '/home',
        // component: Home,
        component: () => import('../views/Home.vue'),
    },
    {
        name: 'about',
        path: '/about',
        // component: About,
        component: () => import('../views/About.vue'),
    },
    {
        name: 'nofound',
        path: '/nofound',
        // component: NotFound,
        component: () => import('../views/NotFound.vue'),
    },
    {
        name:"User",
        path:'/user',
        //路由懒加载(优化性能，按需加载)
        component:()=>import('../views/user/User.vue'),
        //子路由
        children:[
            {
                name:'UserProfile',
                path:'profile',
                component:()=>import('../views/user/Profile.vue'),
            },
            {
                name:'UserSetting',
                path:'setting',
                component:()=>import('../views/user/Setting.vue'),
            }
        ]

    }

]

const router = createRouter({
    history: createWebHashHistory(),
    routes,
})
export default router