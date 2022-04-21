<template>
  <avue-form-design style="height: 100vh;"
                    :undo-redo="false"
                    :show-github-star="false"
                    :include-fields="[]"
                    :custom-fields="customFields">
  </avue-form-design>
</template>

<script>

export default { // 方便演示，隐藏了其他字段
  data() {
    return {
      customFields: [{
        title: '警告',
        component: 'el-alert',
        labelWidth: '0px',
        span: 24,
        icon: 'el-icon-warning',
        params: {
          title: '警告警告警告警告',
          type: 'success'
        },
        event: {
          close: () => {
            console.log('alert关闭事件')
          }
        }
      }, {
        title: '时间线',
        component: 'custom-timeline',
        labelWidth: '0px',
        span: 24,
        icon: 'el-icon-sort',
        params: {
          reverse: false,
          itemList: [{
            content: '支持使用图标',
            timestamp: '2018-04-12 20:46',
            size: 'large',
            type: 'primary',
            icon: 'el-icon-more'
          }, {
            content: '支持自定义颜色',
            timestamp: '2018-04-03 20:46',
            color: '#0bbd87'
          }, {
            content: '支持自定义尺寸',
            timestamp: '2018-04-03 20:46',
            size: 'large'
          }, {
            content: '默认样式的节点',
            timestamp: '2018-04-03 20:46'
          }]
        }
      }]
    }
  },
}
</script>
