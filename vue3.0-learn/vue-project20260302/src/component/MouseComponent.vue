<script setup >
import {useMouse} from '../common/mouse.js'
const {x,y}=useMouse()
</script>

<template>
    <div>
      Mouse position is at:{{x}},{{y}}
    </div>
</template>

