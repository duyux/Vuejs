<template>
  <div>
    <!--导航区-->
    <ul>
      <li v-for="n in news" :key="n.id">
        <!-- <router-link :to="`/news/detail?id=${n.id}&title=${n.title}&content=${n.content}`">{{ n.title }}</router-link> -->
        <router-link :to="{
            path:'/news/detail',
            query:{
                id:n.id,
                title:n.title,
                content:n.content
            }
        }">{{ n.title }}</router-link>  
    </li>
    </ul>
    <!--展示区-->
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

const news = reactive([
  { id: 1, title: "news1", content: "news1 content" },
  { id: 2, title: "news2", content: "news2 content" },
  { id: 3, title: "news3", content: "news3 content" },
  { id: 4, title: "news4", content: "news4 content" },
  { id: 5, title: "news5", content: "news5 content" },
  { id: 6, title: "news6", content: "news6 content" },
  { id: 7, title: "news7", content: "news7 content" },
]);
</script>

<style scoped>
div{
    display: flex;
}
</style>
