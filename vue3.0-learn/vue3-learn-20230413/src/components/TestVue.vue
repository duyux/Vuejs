<template>
  <div>
    <button @click="changeName">changeName</button>
    <span>{{state.name }}</span>
  </div>
</template>

<script setup>
// import {reactive,ref,toRefs} from 'vue'
import {reactive} from 'vue'
import {computed,ref} from 'vue'

//ref声明响应式数据，用于声明基本数据类型
// const name=ref("Jerry")
// //修改
// name.value='Tom'

//reactive声明响应式数据，用于声明引用数据类型
const state=reactive({
  name:'Jerry',
  sex:'男'
})

//state.name='Tom'

//使用toRefs解构template可直接使用{{name}}、{{sex}}
//const {name,sex}=toRefs(state)

//声明method方法
const changeName=()=>{
  state.name='Tom'
}


const count=ref(1)

//通过computed获得doubleCount
const doubleCount=computed(()=>{
  return count.value * 2
})

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
