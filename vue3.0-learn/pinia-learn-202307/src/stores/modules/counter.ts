import { defineStore } from "pinia";

const useCounter = defineStore("couter", {
  state: () => ({
    count: 99,
    name: "zs",
    age: 18,
    firstname:'刘',
    lastname:'亮',
  }),
  getters:{
    doubleCount:(state) =>state.count * 2,
    fullname:(state) =>state.firstname+state.lastname,
  },
  actions:{
    increment(){
       this.count++;
    },
    //可以为actions中定义的方法传递参数
    incrementByPayload(payload){
        this.count+=payload;
    },
    randomCount(){
        this.count=Math.random();
    },
    async fetchData(){
        const res=await fetch('...')
        return res;
    }
  }

});

export default useCounter;
