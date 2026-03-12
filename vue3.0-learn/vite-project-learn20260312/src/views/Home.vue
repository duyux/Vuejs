<template>
  <div>
    <h1>首页</h1>
    <p>这是 Vue3 + Vite + Vue Router 的基础示例</p>
    <!-- 编程式导航示例 -->
    <button @click="goToAbout" style="margin-top: 10px; padding: 8px 16px; cursor: pointer;">
      跳转到关于页（编程式）
    </button>

    <button @click="store.increment()">
       增加计数:{{ store.count }}
    </button>

    <button @click="counter.increment()">
       测试Pinia计数:{{ counter.count }}
    </button>
  </div>
</template>

<script setup>
import {useRouter} from 'vue-router'
import {store} from '@/stores/testsimplestore'

import {useCounterStore} from '@/stores/counter'

const counter=useCounterStore()


//编程式导航(通过JS跳转路由)
const router=useRouter()
const goToAbout=()=>{
  router.push('/about')
}



</script>