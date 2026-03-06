<template>
  <div class="pxcharts-container">
    <!-- 多维表格视图 -->
    <GridView :data="tableData" :config="tableConfig" /><!-- 可视化图表（集成ECharts） -->
    <v-chart :option="chartOption" style="width: 100%; height: 400px;" />
  </div>
</template>

<script setup>
// 引入pxcharts-vue核心组件（多维表格视图）
import { GridView } from 'pxcharts-vue';
// 引入ECharts可视化组件（pxcharts-vue集成，无需额外安装）
import VChart from 'vue-echarts';
// 引入必要样式
import 'pxcharts-vue/dist/style.css';

// 模拟多维表格数据
const tableData = ref([
  { id: 1, name: '产品A', category: '电子', sales: 1200, date: '2026-03-01' },
  { id: 2, name: '产品B', category: '家电', sales: 800, date: '2026-03-02' }
]);

// 表格配置（支持视图切换、字段配置等）
const tableConfig = ref({
  viewType: 'grid', // 视图类型：grid（表格）、kanban（看板）、calendar（日历）
  fields: [
    { key: 'name', label: '产品名称', editable: true },
    { key: 'category', label: '品类', type: 'select', options: ['电子', '家电', '服饰'] },
    { key: 'sales', label: '销售额', type: 'number' }
  ]
});

// 可视化图表配置（ECharts语法，pxcharts-vue无缝集成）
const chartOption = ref({
  xAxis: { type: 'category', data: ['产品A', '产品B', '产品C'] },
  yAxis: { type: 'value' },
  series: [{ type: 'bar', data: [1200, 800, 1500] }]
});
</script>

<style scoped>
.pxcharts-container {
  width: 100%;
  padding: 20px;
}
</style>