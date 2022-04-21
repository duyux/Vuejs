<template>
  <div>{{color}}</div>
  <button @click="color=color==='red' ? 'green':'red'">按钮</button>
</template>

<script setup>
  import {ref} from 'vue'
  const color=ref('ref')
</script>

<style scoped>
   div{
     color:v-bind(color)
   }
</style>