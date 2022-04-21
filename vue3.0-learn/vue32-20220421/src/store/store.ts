import { defineStore } from "pinia"

//defineStore调用后返回一个函数，调用该函数获得Store实体
export const useStore=defineStore({
    //id:必须，在所有Store中唯一
    id:"globalState",

    //state:返回的对象的函数
    state:() =>({
        count:1,
        data:{
            name:'Jerry',
            sex:'男'
        }
    
    }),
//getter 第一个参数是state,是当前的状态，也可以使用this获取状态
//getter中也可以访问其它的getter,或者是其它的Store
    getters:{
      //通过state获取状态
      doubleCount:(state) => state.count *2,

      //通过this获取状态
      tripleCount(){
          return this.count * 3
      }
    },
    actions:{
        updateData(newData,count) {
            //使用this直接修改
            this.data={...newData}
            this.count=count

            //使用 $patch修改多个值
            // this.$patch({
            //     data:{...newData},
            //     count:2
            // })
        }

    }
})