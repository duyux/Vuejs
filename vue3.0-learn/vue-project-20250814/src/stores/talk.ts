import { defineStore } from "pinia";

//定义并暴露一个store
export const useTalkStore=defineStore('talk',{
    //动作
    actions:{},
    //状态
    state:()=>{
        return {
            talkList:[
                {id:'yuysada01',content:'你今天有点怪，哪里怪？怪好看的！'},
                {id:'yuysada02',content:'你今天有点怪，哪里怪？怪好吃的！'},
                {id:'yuysada03',content:'你今天有点怪，哪里怪？怪好玩的！'}
            ]
        }
    },
    //计算属性
    getters:{}

})