<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script setup>
import { RouterView } from 'vue-router'
</script>


<style>
.app-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #a8c0ff, #3f2b96);
  padding: 2rem;
}

/* 移除max-width限制保持背景全屏 */

h1 {
  color: #1a237e;
  margin-bottom: 2rem;
}

.button {
  padding: 1rem;
  background: rgba(255,255,255,0.9);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
</style>
