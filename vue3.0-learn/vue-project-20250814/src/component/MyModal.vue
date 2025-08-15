<script setup>
import { ref } from "vue";

const open = ref(false);
</script>
<template>
  <div>
    <button @click="open = true">Open Modal</button>
    <Teleport to="body">
      <div v-if="open" class="modal">
        <p>Hello from the modal!</p>
        <button @click="open = false">Close</button>
      </div>
    </Teleport>
  </div>
</template>
<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
  border: 2px solid #42b983;
  border-radius: 10px;
  padding: 20px;
}
</style>
