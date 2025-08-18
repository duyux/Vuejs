<template>
    <h2>当前求和为：{{ countStore.sum }}</h2>
</template>
<script setup>
import {userCountStore} from "@/stores/count";

const countStore=userCountStore();
</script>