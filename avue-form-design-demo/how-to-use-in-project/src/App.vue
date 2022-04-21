<template>
npm
<script>

export default {
  data() {
    return {
      options: { // 可以是Object
        column: [{
          label: '单行文本',
          prop: 'input',
          type: 'input'
        }]
      },
      // options: `{ column: [{ label: '单行文本', prop: 'input', type: 'input' }] }`, // 也可以是String，用于接口请求后直接赋值
    }
  }
}
</script>
