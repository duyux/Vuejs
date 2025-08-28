<script setup></script>

<template>
  <div class="app">
    <h2>vue路由示例</h2>
    <!--导航区-->
    <div class="nav">
      <router-link to="/home">首页</router-link>
      <router-link to="/news">新闻</router-link>
      <router-link :to="{ path: '/about' }">关于</router-link>
    </div>
    <!--展示区-->
    <div class="content">
      <router-view></router-view>
    </div>
  </div>
</template>

<style scoped></style>
