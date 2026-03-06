<script setup>
import { ref } from 'vue'

const open = ref(false)
</script>

<template>
    <button @click="open = true">Open Modal</button>
    <Teleport to="body">
        <div v-if="open" class="modal">
            <p>Hello from the modal!</p>
            <button @click="open = false">Close</button>
        </div>
    </Teleport>
</template>
<style scoped>
.modal {
    position: fixed;
    z-index: 999;
    top: 20%;
    left: 50%;
    width: 300px;
    margin-left: -150px;
    padding: 30px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>