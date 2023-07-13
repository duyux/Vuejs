<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import { useCounterStore } from "@/store/counter";
const couterStore = useCounterStore();
</script>

<template>
  <h1 class="text-3xl">vue3-element-admin-父组件</h1>
  <el-button type="primary" @click="couterStore.increment">count++</el-button>
  <HelloWorld />
</template>

<style scoped></style>
