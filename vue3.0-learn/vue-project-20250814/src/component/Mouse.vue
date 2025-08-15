<script setup>
import {useMouse} from '../js/Mouse.js';

const {x,y}=useMouse()
</script>
<template>
  <div>Mouse postion is at:{{ x }},{{ y }}</div>
</template>
