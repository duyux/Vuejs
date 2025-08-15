<script setup>
import { ref, computed } from "vue";
import Home from "@/views/Home.vue";
import About from "@/views/About.vue";
import NotFound from "@/views/NotFound.vue";

const routes = {
  "/": Home,
  "/about": About,
  "/not-found": NotFound,
};

const currentPath = ref(window.location.hash);
window.addEventListener("hashchange", () => {
  console.log(123);
  console.log(window.location.hash);
  currentPath.value = window.location.hash;
  
});

const currentView = computed(() => {
  console.log(currentPath.value.slice(1) );
  return routes[currentPath.value.slice(1)|| "/"];
  //return routes[currentPath.value.slice(1) || "/"] || routes["/not-found"];
});
</script>
<template>
  <div>
    <a href="#/">Home</a> | 
    <a href="#/about">About</a> |
    <a href="#/not-found">Broken Link</a>
    <component :is="currentView" />
  </div>
</template>
