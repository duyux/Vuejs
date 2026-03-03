<template>
    <div class="alert-box">
        <strong>This is an Error for Demo Purposes</strong>
        <br/>
        <slot/>
    </div>
</template>
<style scoped>
    .alert-box{
        border: 1px solid red;
        padding: 10px;
        margin: 10px;
    }
</style>
