<script setup lang="ts">
import { ref } from 'vue';
import ToolList from './components/ToolList.vue';
import ToolManager from './components/ToolManager.vue';

// 当前页面状态
const currentPage = ref<'user' | 'admin'>('user');
</script>

<template>
  <div class="app-container">
    <!-- 导航栏 -->
    <header class="app-header">
      <div class="nav-container">
        <h1 class="app-title">工具站</h1>
        <nav class="app-nav">
          <button 
            @click="currentPage = 'user'"
            :class="['nav-button', { active: currentPage === 'user' }]"
          >
            用户端
          </button>
          <button 
            @click="currentPage = 'admin'"
            :class="['nav-button', { active: currentPage === 'admin' }]"
          >
            管理端
          </button>
        </nav>
      </div>
    </header>

    <!-- 主要内容区域 -->
    <main class="app-main">
      <ToolList v-if="currentPage === 'user'" />
      <ToolManager v-else-if="currentPage === 'admin'" />
    </main>

    <!-- 页脚 -->
    <footer class="app-footer">
      <p>工具站 © 2024 版权所有</p>
    </footer>
  </div>
</template>

<style>
/* 全局样式重置 */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

/* 应用容器 */
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

/* 头部导航 */
.app-header {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 64px;
}

.app-title {
  font-size: 20px;
  color: #333;
  font-weight: 600;
}

.app-nav {
  display: flex;
  gap: 8px;
}

.nav-button {
  padding: 8px 16px;
  border: 1px solid #ddd;
  background: #fff;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button:hover {
  background: #f5f5f5;
}

.nav-button.active {
  background: #42b983;
  color: white;
  border-color: #42b983;
}

/* 主要内容区域 */
.app-main {
  flex: 1;
  padding: 20px 0;
}

/* 页脚 */
.app-footer {
  background: #333;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: auto;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .nav-container {
    padding: 0 16px;
    flex-direction: column;
    height: auto;
    padding: 12px 16px;
    gap: 12px;
  }
  
  .app-title {
    font-size: 18px;
  }
  
  .app-main {
    padding: 16px 0;
  }
  
  .app-footer {
    padding: 16px;
  }
}
</style>
