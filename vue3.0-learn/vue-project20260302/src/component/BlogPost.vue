<script setup lang="ts">
defineProps(['title'])
const $emit=defineEmits(['enlarge-text'])

const enlargeText=()=>{
  $emit('enlarge-text')
  console.log('enlargeText')
}
</script>

<template>
    <div class="blog-post">
        <h4>{{ title }}</h4>
        <button @click="enlargeText">Enlarge text</button>
    </div>
</template>