<template>
  <div >
    <button @click="btnclick">单击</button>
    <p>{{num}}</p>
    姓:<input v-model="username.surname"><br>
    名:<input v-model="username.name"><br>
    单相响应：<input v-model="username.nick">
  </div>
</template>

<script setup lang="ts">
  import {defineComponent,ref} from 'vue'
  import { reactive } from 'vue';
  import {computed} from '@vue/reactivity'
  defineProps<{
    msg: string
  }>()
  //声明双向数据ref
  const num=ref();
  //js通过.value获取值
  num.value=123;

  const btnclick=()=>{
    num.value+=1
  }

  const username=reactive({
    surname:'张',
    name:'三'
  })

username.nick=computed(()=>{
  return username.surname+'*'+username.name
})


  
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
