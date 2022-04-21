<template>
  <div style="padding: 10px 20px">
    <div style="margin-bottom: 15px;">
      <el-button size="mini"
                 @click="handleFormClick()">点我表单展示</el-button>
      <el-button size="mini"
                 @click="type = 'design'">点我继续设计</el-button>
    </div>
    <!-- <avue-form v-if="type == 'form'"
               :option="option"
               v-model="form"></avue-form>

    <avue-form-design v-if="type == 'design'"
                      style="height: 100vh"
                      :options="option"></avue-form-design> -->
    <avue-form v-if="type == 'form'"
               :option="option"
               v-model="form"               
               >
               
               </avue-form>

    <avue-form-design v-if="type == 'design'"
                      style="height: 100vh"
                      @submit='handleSubmit'
                      :options="optiondesign"></avue-form-design>
  </div>
</template>

<script>

export default {
  data() {
    return {
      form: {},
      option: {},
      optiondesign:{column:[{title:'警告',component:'el-alert',labelWidth:'0px',span:24,tips:'看我：自定义事件怎么用？',params:{title:'警告警告警告警告',type:'success'},event:{close:() => {console.log("alert关闭事件")}},prop:'1604994693264_45719'},{type:'input',label:'单行文本',span:24,display:true,prop:'1604994714440_81340'},{type:'textarea',label:'多行文本',span:24,display:true,prop:'1604994716622_2069'},{type:'checkbox',label:'多选框组',dicData:[{label:'选项一',value:'0'},{label:'选项二',value:'1'},{label:'选项三',value:'2'}],span:24,display:true,props:{label:'label',value:'value'},prop:'1604994720075_23876'}],labelPosition:'left',labelSuffix:'：',labelWidth:120,gutter:0,menuBtn:true,submitBtn:true,submitText:'提交',emptyBtn:true,emptyText:'清空',menuPosition:'center'},
      type: 'design'
    }
  },
  mounted() {
    // 模拟请求
    // const loading = this.$loading({
    //   lock: true,
    //   text: 'Loading',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.7)'
    // })
    // setTimeout(() => {
    //   // 假如这是请求来的js配置
    //   //const option = `{column:[{title:'警告',component:'el-alert',labelWidth:'0px',span:24,tips:'看我：自定义事件怎么用？',params:{title:'警告警告警告警告',type:'success'},event:{close:() => {console.log("alert关闭事件")}},prop:'1604994693264_45719'},{type:'input',label:'单行文本',span:24,display:true,prop:'1604994714440_81340'},{type:'textarea',label:'多行文本',span:24,display:true,prop:'1604994716622_2069'},{type:'checkbox',label:'多选框组',dicData:[{label:'选项一',value:'0'},{label:'选项二',value:'1'},{label:'选项三',value:'2'}],span:24,display:true,props:{label:'label',value:'value'},prop:'1604994720075_23876'}],labelPosition:'left',labelSuffix:'：',labelWidth:120,gutter:0,menuBtn:true,submitBtn:true,submitText:'提交',emptyBtn:true,emptyText:'清空',menuPosition:'center'}`
    //   //console.log('dd',this.optiondesign)
    //   const option=this.optiondesign;
    //   //this.option = eval("(" + option + ")")
    //   this.option=option;
    //   loading.close()
    // }, 1500);
    // setTimeout(() => {
    //   // 假如这是请求来的js配置
    //   const option = `{column:[{title:'警告',component:'el-alert',labelWidth:'0px',span:24,tips:'看我：自定义事件怎么用？',params:{title:'警告警告警告警告',type:'success'},event:{close:() => {console.log("alert关闭事件")}},prop:'1604994693264_45719'},{type:'input',label:'单行文本',span:24,display:true,prop:'1604994714440_81340'},{type:'textarea',label:'多行文本',span:24,display:true,prop:'1604994716622_2069'},{type:'checkbox',label:'多选框组',dicData:[{label:'选项一',value:'0'},{label:'选项二',value:'1'},{label:'选项三',value:'2'}],span:24,display:true,props:{label:'label',value:'value'},prop:'1604994720075_23876'}],labelPosition:'left',labelSuffix:'：',labelWidth:120,gutter:0,menuBtn:true,submitBtn:true,submitText:'提交',emptyBtn:true,emptyText:'清空',menuPosition:'center'}`
   
    //   this.option = eval("(" + option + ")")
    //   loading.close()
    // }, 1500);
  },
   methods: {
        handleFormClick() {
          this.type = 'form'
          console.log("option:"+JSON.stringify(this.optiondesign));
           this.option=this.optiondesign;
          //this.$message.success("查看控制台")
        },
        handleSubmit(data){
          this.optiondesign=data;
        }
      }
}
</script>
