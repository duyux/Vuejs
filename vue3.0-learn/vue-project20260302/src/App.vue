<script setup lang="ts">
import {ref,watch} from 'vue'
import {reactive,computed} from 'vue'
import Child from './component/Child.vue';


// const author=reactive({
//   name:'John Doe',
//   books:[
//     'Vue 2 - Advanced Guide',
//     'Vue 3 - Basic Guide',
//     'Vue 4 - The Mystery'
//   ]
// })

//一个计算属性 ref
// const publishedBooksMessage=computed(() =>{
//   return author.books.length > 0 ? 'Yes':'No'
// })

// const isActive=ref(true)
// const hasError=ref(false)

// const awesome=ref(true)


// const items=ref([
//   {message:'Foo'},
//   {message:'Bar'},
//   {message:'Abe'}
// ])

// const message=ref();

//测试侦听器
// const question=ref('')
// const answer=ref('Questions usually contain a question mark.;')
// const loading=ref(false)

//可以直接侦听一个ref
// watch(question,async(newQuestion,oldQuestion) =>{
//   if(newQuestion.includes('?')){
//     loading.value=true
//     answer.value="Thinking..."
//     try{
//       const res=await fetch('http://yesno.wtf/api')
//       answer.value=(await res.json()).answer
//     }catch(error){
//       answer.value='Error!Could not reach the API.'+error
//     }finally{
//       loading.value=false
//     }
//   }
// })

//测试子向父 回调
const handleSubmit=(mydata:any)=>{
    console.log('子组件触发submit事件')
   console.log('收到提交数据：',mydata)

}


</script>

<template>
  <div id="app">
    <!-- <button @click="increment">单击按钮：{{ count }}</button>
    <p>Has publised books:</p>
    <span>{{ publishedBooksMessage }}</span>

    <div :class="{active:isActive}"></div>

    <button @click="awesome =!awesome">Toggle</button>
    <h1 v-if="awesome">Vue is awesome!</h1>
    <h1 v-else>Oh no</h1>

    <li v-for="(value,key) in items" :key="key">{{ value.message }}</li>

    <p>Message is :{{ message }}</p>
    <input v-model="message" placeholder="edit me" />

    <p>
      Ask a yes/no question:
      <input v-model="question" :disabled="loading" />
    </p>
    <p>{{ answer }}</p> -->

      <Child @submit="handleSubmit"/>
fdfdff
  </div>

</template>

<style scoped></style>
