<template>
  <avue-form-design style="height: 100vh;"
                    ref="form"
                    :undo-redo="false"
                    :show-github-star="false"
                    :toolbar="toolbar">
    <template slot="toolbar">
      <el-button type="text"
                 icon="el-icon-download"
                 @click="handleGetData">获取JSON</el-button>
    </template>
  </avue-form-design>
</template>

<script>

export default {
  data() {
    return {
      toolbar: ['generate', 'preview', 'clear']
    }
  },
  methods: {
    handleGetData() {
      this.$refs.form.getData('string').then(data => {
        this.$message.success("查看控制台")
        console.log(data)
      })
    }
  }
}
</script>
