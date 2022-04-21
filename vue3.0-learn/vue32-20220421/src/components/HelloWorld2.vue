<template>
  <div>
    显示的值{{flag}}
    time:{{time}}
    <button @click="changeHander">改变值</button>
    <button @click="handler1Click">新增</button>
    <button @click="handler2Click">删除</button>
  </div>

  <span> 有开始循环了-开端 </span>  
  <div>
    <p>姓名：{{store.data.name}}</p>
    <p>性别：{{store.data.sex}}</p>
      
    <p>获取getter：{{store.doubleCount}}</p>
    <button @click='updateInfo'>修改用户信息</button>
  </div>
 
</template>

<script setup lang="ts">
import { ref, defineProps,reactive,defineExpose } from 'vue'
import {defineEmits} from 'vue'
import {useStore} from '/src/store/store'

const store=useStore()

const updateInfo=():void =>{
  store.updateData({name:'Tom',sex:'女'},22)
}

let sex=ref('男')
let info=reactive({
  like:'喜欢李诗情',
  age:27
})

//将组件中的属性暴露出去，这样父组件可以获取
defineExpose({
  sex,
  info
})


//使用defineEmits创建名称，接受一个数组
let $myemit=defineEmits(['myAdd','myDel'])

let handler1Click=():void=>{
  $myemit("myAdd",'新增的数据')
}

let handler2Click=():void=>{
  $myemit('myDel','删除的数据')
}

// defineProps<{ msg: string }>()
defineProps({
  msg:{
    type:String,
    default:'---'
  },
  time:{
    type:String,
    default:'0分钟'
  }
})

let flag=ref("开端-第一次循环")
const count = ref(0)

let changeHander=():void => {
  flag.value="开端-第二次循环"
}


const state=reactive({
  color:'red'
})

</script>



<style scoped>
a {
  color: #42b983;
}
span{
  /* 使用v-bind绑定state中的变量*/
  color:v-bind('state.color')
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
