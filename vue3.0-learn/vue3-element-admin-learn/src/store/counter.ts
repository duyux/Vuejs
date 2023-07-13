import {defineStore} from 'pinia'
import { ref,computed } from 'vue';

export const useCounterStore=defineStore('counter',() => {
    //ref变量 ->state属性
    const count=ref(0);
    //computed计算属性 ->getters
    const double=computed(() => {
        return count.value * 2;
    })

    //fuction函数 ->actions
    function increment() {
        count.value ++;
    }

    return {count,double,increment}

})