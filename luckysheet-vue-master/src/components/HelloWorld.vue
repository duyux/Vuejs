<template>
  <div class="hello">
    <div
      id="luckysheet"
      style="margin:0px;padding:0px;position:absolute;width:100%;height:100%;left: 0px;top: 0px;"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  mounted() {
    // In some cases, you need to use $nextTick
    // this.$nextTick(() => {
          $(function () {
            // luckysheet.create({
            //   container: "luckysheet",
            // });
            // 配置项
const options = {
    container: 'luckysheet', // 设定DOM容器的id
    title: 'Luckysheet Demo', // 设定表格名称
    lang: 'zh' // 设定表格语言

    // 更多其他设置...
}

// 初始化表格
luckysheet.create(options)
          });
      
    // });
  },
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
