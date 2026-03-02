<template>
  <div class="tool-list-container">
    <h1>工具站</h1>
    <div class="filter-section">
      <div class="search-box">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="搜索工具..."
          class="search-input"
        >
      </div>
      <div class="filter-select">
        <select v-model="selectedType" class="type-select">
          <option value="">所有类型</option>
          <option v-for="type in toolTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>
    </div>
    
    <div v-if="loading" class="loading">
      <p>加载工具中...</p>
    </div>
    
    <div v-else-if="filteredTools.length === 0" class="no-tools">
      <p>没有找到匹配的工具</p>
    </div>
    
    <div v-else class="tool-grid">
      <ToolCard v-for="tool in filteredTools" :key="tool.id" :tool="tool" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import ToolCard from './ToolCard.vue';
import type { Tool } from '../types/tool';
import { getTools } from '../services/toolService';
import { toolTypes } from '../data/mockData';

// 状态
const tools = ref<Tool[]>([]);
const loading = ref(true);
const searchQuery = ref('');
const selectedType = ref('');

// 过滤工具
const filteredTools = computed(() => {
  return tools.value.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
                        tool.description.toLowerCase().includes(searchQuery.value.toLowerCase());
    const matchesType = selectedType.value === '' || tool.type === selectedType.value;
    return matchesSearch && matchesType;
  });
});

// 加载工具数据
const loadTools = async () => {
  loading.value = true;
  try {
    tools.value = await getTools();
  } catch (error) {
    console.error('加载工具失败:', error);
  } finally {
    loading.value = false;
  }
};

// 初始加载
onMounted(() => {
  loadTools();
});
</script>

<style scoped>
.tool-list-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-list-container h1 {
  text-align: center;
  margin-bottom: 30px;
  color: #333;
  font-size: 32px;
}

.filter-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
  flex-wrap: wrap;
  gap: 12px;
}

.search-box {
  flex: 1;
  min-width: 250px;
}

.search-input {
  width: 100%;
  padding: 10px 16px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.search-input:focus {
  outline: none;
  border-color: #42b983;
}

.filter-select {
  min-width: 150px;
}

.type-select {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  font-size: 14px;
  background: white;
  cursor: pointer;
  transition: border-color 0.2s ease;
}

.type-select:focus {
  outline: none;
  border-color: #42b983;
}

.loading,
.no-tools {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.tool-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tool-list-container {
    padding: 16px;
  }
  
  .tool-list-container h1 {
    font-size: 24px;
    margin-bottom: 20px;
  }
  
  .filter-section {
    flex-direction: column;
    align-items: stretch;
  }
  
  .search-box,
  .filter-select {
    min-width: auto;
  }
  
  .tool-grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
}
</style>