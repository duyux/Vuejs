
<template>
  <img alt="Vue logo" src="./assets/logo.png" />
  <!-- <HelloWorld msg="Hello Vue 3 + TypeScript + Vite" /> -->
  <hello-world2 ref="testcomref" msg="Hello Vue 3 + TypeScript + Vite" time="1分钟" @myAdd="myAddHander" @myDel="myDelHander" />
  <button @click="getSonHander">获取子组件的信息</button>
</template>

<script setup lang="ts">
import {ref} from 'vue'
// import HelloWorld from './components/HelloWorld.vue'
import HelloWorld2 from './components/HelloWorld2.vue'


const testcomref=ref()
const getSonHander=():void =>{
  console.log("获取子组件中的性别：",testcomref.value.sex)
  console.log("获取子组件中的其它信息：",testcomref.value.info)
}

let myAddHander=(mess):void =>{
  console.log("新增==>",mess)
}

let myDelHander=(mess):void =>{
  console.log("删除=>",mess)
}
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
