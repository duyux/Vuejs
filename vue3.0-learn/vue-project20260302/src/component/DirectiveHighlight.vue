<script setup>
//在模版中启用v-highlight指令
const vHighlight = {
    mounted: (el) => {
        el.classList.add('is-highlight')
    }
}

</script>
<template>
    <p v-highlight>This sentence is important!</p>
</template>

<style scoped>
.is-highlight {
    background-color: #ff0;
    color: #000;
}
</style>