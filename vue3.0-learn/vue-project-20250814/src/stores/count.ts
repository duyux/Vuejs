import {defineStore} from 'pinia'

//定义并暴露一个store
export const userCountStore=defineStore('count',{
    //动作
    actions:{},
    //状态
    state(){
        return{
            sum:6
        }
    },
    //计算属性
    getters:{
        double(state){
            return state.sum*2
        }
    }
})