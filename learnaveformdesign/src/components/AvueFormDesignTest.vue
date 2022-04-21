<template>
  <div >
      <avue-form-design style="height: 100vh;"
                      :options="options"
                      @submit="handleSubmit"
                      storage
                      :custom-fields="customFields"></avue-form-design>
  </div>
</template>

<script>

export default {
  name: 'AvueFormDesignTest',
  data() {
    return {
         customFields: [
        {
          title: '分割线',
          component: 'el-divider',//ele分割线
          span: 24,
          icon: 'el-icon-eleme',
          tips: '看我：自定义属性怎么用？',
          labelWidth: '0px',
          params: {
            html: '<h3 style="color:red">分割线标题</h3>',
            contentPosition: "left",
          }
        },
        {
          title: '警告',
          component: 'el-alert',
          labelWidth: '0px',
          span: 24,
          icon: 'el-icon-warning',
          tips: '看我：自定义事件怎么用？',
          params: {
            title: '警告警告警告警告',
            type: 'success'
          },
          event: {
            close: () => {
              console.log('alert关闭事件')
            }
          }
        },
      ],
      options: { column: [] }
    };
  },
   methods: {
        handleSubmit(data) {
          this.$message.success("查看控制台")
          console.log(data)
        }
      }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
