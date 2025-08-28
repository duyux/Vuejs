import {createRouter,createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import News from '../views/News.vue'
import NewsDetail from '../views/NewsDetail.vue'

//创建路由规则
const router=createRouter({
    history:createWebHistory(),
    routes:[
        {
            path:'/home',
            name:'Home',
            component:Home
        },{
            path:'/about',
            name:'About',
            component:About
        },{
            path:'/news',
            name:'News',
            component:News,
            children:[{
                path:'detail',
                name:'NewsDetail',
                component:NewsDetail
            }]
        }
    ]
})

//导出路由规则
export default router;