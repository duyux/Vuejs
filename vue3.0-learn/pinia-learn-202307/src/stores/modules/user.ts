import {defineStore} from 'pinia'
import {computed, ref} from 'vue'

type User={
    id:string,
    name:string,
    age:number,
    gender:string
}

//通过const useUserStore = defineStore('id', () => {})创建数据仓库
//vuex 中的 state 在 pinia 中可以引用 ref 和 reactive 创建响应式数据
//vuex 中的 getters 在 pinia 中可以引用 computed 创建计算属性
//vuex 中的 mutations 和 actions 在 pinia 中就是普通函数, 同步异步都可以

export const useUserStore=defineStore('user',() =>{
    // 相当于 vuex 中的 state
    const userInfo=ref<User>({
        id:'abc',
        name:'张三',
        age:15,
        gender:'男'
    })
    
     // 相当于 vuex 中的getters
     const changeAge=computed(() =>userInfo.value.age + 5)

    
    //相当于 vuex 中的mutations
    const update=(name:string) =>{userInfo.value.name=name}

    //相当于vuex中的action,可以做一些异步请求
    const asyncUpdate=(gender:string) =>{
        setTimeout(() => {
            userInfo.value.gender=gender
        }, 3000);
    }

    return {userInfo,changeAge,update,asyncUpdate}
},
//使用数据持久化
{
    persist:true,
}
)