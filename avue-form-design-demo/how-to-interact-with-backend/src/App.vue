<template>
  <div style="padding: 20px">
    <avue-crud :option="option"
               :table-loading="loading"
               :data="data"
               v-model="form"
               @row-update="rowUpdate"
               @row-save="rowSave"
               @row-del="rowDel"
               @on-load="onLoad">
      <template slot="menu"
                slot-scope="{row}">
        <el-button type="text"
                   icon="el-icon-edit-outline"
                   @click="handleDesign(row)">设计</el-button>
      </template>
    </avue-crud>

    <el-dialog :visible.sync="visible"
               title="表单设计"
               fullscreen
               :before-close="handleClose">
      <avue-form-design style="height: 89vh"
                        ref="formDesign"
                        :toolbar="['clear', 'preview', 'import']"
                        :includeFields="['group', 'dynamic', 'input', 'textarea', 'number', 'map', 'radio','checkbox','select','tree','cascader', 'upload', 'date','time','datetime','daterange','datetimerange','timerange','ueditor','switch','rate','color','icon','slider']"
                        :options="options">
        <template slot="toolbar">
          <el-button type="text"
                     size="medium"
                     icon="el-icon-download"
                     @click="handleSubmit">保存</el-button>
        </template>
      </avue-form-design>
    </el-dialog>
  </div>
</template>

<script>
// import { getList, add, update, remove } from "@/api/flow/form";

export default {
  data() {
    return {
      visible: false,
      options: {},
      form: {},
      loading: true,
      selectionList: [],
      option: {
        tip: false,
        border: true,
        index: true,
        selection: true,
        dialogType: 'drawer',
        align: 'center',
        column: [
          {
            label: "表单key",
            prop: "key",
            rules: [{
              required: true,
              message: "请输入表单key",
              trigger: "blur"
            }],
            // search: true
          },
          {
            label: "表单名称",
            prop: "name",
            rules: [{
              required: true,
              message: "请输入表单名称",
              trigger: "blur"
            }],
            // search: true
          },
        ]
      },
      data: []
    }
  },
  methods: {
    // 提交设计器配置
    handleSubmit() {
      this.$refs.formDesign.getData('string').then(data => {
        this.row.content = data
        this.$store.dispatch("SubmitData", this.row).then(() => {
          this.$message.success("保存成功")
          this.visible = false
        })
      })
    },
    // 设计器关闭前
    handleClose(done) {
      this.$confirm('关闭会丢失未保存的配置, 是否继续?', '提示', {
        type: 'warning'
      }).then(() => {
        done()
      }).catch(() => {
      })
    },
    // 开始设计
    handleDesign(row) {
      this.visible = true
      this.options = this.deepClone(row.content || '')
      this.row = row
    },
    // 增
    rowSave(row, loading, done) {
      loading()
      this.$store.dispatch("SubmitData", row).then(() => {
        this.onLoad(this.page)
        this.$message({
          type: "success",
          message: "操作成功!"
        })
      }).catch((error) => {
        done()
        console.log(error)
      })
    },
    // 删
    rowDel(row) {
      this.$confirm("确定将选择数据删除?", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        return this.$store.dispatch("DeleteData", row)
      }).then(() => {
        this.onLoad(this.page)
        this.$message({
          type: "success",
          message: "操作成功!"
        })
      })
    },
    // 改
    rowUpdate(row, index, loading, done) {
      loading()
      this.$store.dispatch("SubmitData", row).then(() => {
        this.onLoad(this.page)
        this.$message({
          type: "success",
          message: "操作成功!"
        })
      }).catch((error) => {
        done()
        console.log(error)
      })
    },
    // 查
    onLoad(page, params = {}) {
      this.loading = true
      this.$store.dispatch("GetData", params).then(res => {
        this.data = res
        this.loading = false
      })
    }
  }
};
</script>

<style>
</style>
