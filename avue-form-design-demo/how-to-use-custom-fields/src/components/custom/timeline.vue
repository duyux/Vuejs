<template>
  <el-timeline :reverse="reverse">
    <el-timeline-item v-for="(item, index) in itemList"
                      :key="index"
                      :icon="item.icon"
                      :type="item.type"
                      :color="item.color"
                      :size="item.size"
                      :timestamp="item.timestamp">
      {{item.content}}
    </el-timeline-item>
  </el-timeline>
</template>

<script>
export default {
  name: 'custom-timeline',
  props: {
    itemList: {
      type: Array,
      default: () => {
        return []
      }
    },
    reverse: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style>
</style>