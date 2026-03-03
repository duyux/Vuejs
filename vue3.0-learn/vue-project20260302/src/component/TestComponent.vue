<script setup >
import { ref, watch } from 'vue'
// import BlogPost from './BlogPost.vue'
// import AlertBox from './AlertBox.vue';

import DymanicCompnent from './DymanicCompnent.vue'

// const posts = ref([
//   { id: 1, title: 'My journey with vue' },
//   { id: 2, title: 'Blogging with Vue' },
//   { id: 3, title: 'Why Vue is so fun' }
// ])

// const postFontSize = ref(1)
</script>

<template>
  <div>
    <!-- <div :style="{ fontSize: postFontSize + 'em' }">
      <BlogPost v-for="post in posts" :key="post.id" :title="post.title" @enlarge-text="postFontSize += 0.1" />
    </div>
    <div>
      <AlertBox>
        Something bad happened.
      </AlertBox>
    </div> -->
 
      <DymanicCompnent></DymanicCompnent>

  </div>
</template>

<style scoped></style>