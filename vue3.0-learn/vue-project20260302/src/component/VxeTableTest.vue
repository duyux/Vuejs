<script setup>
import { ref } from 'vue'
const tableData = ref([
    {
        id: 1,
        name: '用户管理模块负责系统用户的创负责系统用户的创',
        name2: '用户管理模块负责系统用户的创负责系统用户的创',
        name3: '用户管理模块负责系统用户的创负责系统用户的创',
        name4: '用户管理模块负责系统用户的创负责系统用户的创',
        description: '负责系统用户的创建、编辑、删除和权限分配'
    },
    {
        id: 2,
        name: '数据报表负责系统用户的创负责系统用户的创负责系统用户的创负责系统用户的创',
         name2: '数据报表负责系统用户的创负责系统用户的创负责系统用户的创负责系统用户的创',
          name3: '数据报表负责系统用户的创负责系统用户的创负责系统用户的创负责系统用户的创',
           name4: '数据报表负责系统用户的创负责系统用户的创负责系统用户的创负责系统用户的创',
        description: '生成各类业务数据的统计报表，支持导出Excel和PDF格式生成各类业务数据的统计报表，支持导出Excel和PDF格式'
    }
])

</script>
<template>

    <vxe-table :data="tableData" border   >
        <vxe-column type="seq" field="id" width="80" title="序号"></vxe-column>
        <vxe-column field="name"  title="名称1" min-width="150" width="auto" show-overflow="ellipsis"></vxe-column>
        <!-- <vxe-column field="description"  width="auto" max-width="100" title="描述" ></vxe-column> -->
        <vxe-column field="name2"  title="名称2"  width="auto" min-width="150" max-width="600"></vxe-column>
        <!-- <vxe-column field="operation" title="操作" width="150">
            <template #default>
                <el-button size="small" type="text">编辑</el-button>
                <el-button size="small" type="text">删除</el-button>
            </template>
        </vxe-column> -->
    </vxe-table>
</template>
