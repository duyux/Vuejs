<template>
  <div class="tool-card">
    <div v-if="tool.image" class="tool-image">
      <img :src="tool.image" :alt="tool.name" loading="lazy">
    </div>
    <div class="tool-content">
      <h3 class="tool-name">{{ tool.name }}</h3>
      <p class="tool-description">{{ tool.description }}</p>
      <div class="tool-type">{{ tool.type }}</div>
      <div class="tool-meta">
        <span class="update-date">更新于: {{ formatDate(tool.updateDate) }}</span>
      </div>
      <div class="tool-links">
        <a v-if="tool.tutorialUrl" :href="tool.tutorialUrl" target="_blank" rel="noopener noreferrer" class="tool-link tutorial-link">
          查看教程
        </a>
        <a v-if="tool.websiteUrl" :href="tool.websiteUrl" target="_blank" rel="noopener noreferrer" class="tool-link website-link">
          访问官网
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from '../types/tool';

defineProps<{
  tool: Tool;
}>();

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};
</script>

<style scoped>
.tool-card {
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 16px;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.tool-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
}

.tool-image {
  width: 100%;
  height: 120px;
  overflow: hidden;
  border-radius: 4px;
  margin-bottom: 12px;
}

.tool-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.tool-card:hover .tool-image img {
  transform: scale(1.05);
}

.tool-content {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.tool-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 8px 0;
  color: #333;
}

.tool-description {
  font-size: 14px;
  color: #666;
  margin: 0 0 12px 0;
  line-height: 1.5;
  flex: 1;
}

.tool-type {
  display: inline-block;
  background: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  margin-bottom: 12px;
}

.tool-meta {
  margin-bottom: 12px;
}

.update-date {
  font-size: 12px;
  color: #999;
}

.tool-links {
  display: flex;
  gap: 8px;
  margin-top: auto;
}

.tool-link {
  padding: 6px 12px;
  font-size: 12px;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.tutorial-link {
  background: #42b983;
  color: white;
}

.tutorial-link:hover {
  background: #3aa876;
}

.website-link {
  background: #007bff;
  color: white;
}

.website-link:hover {
  background: #0056b3;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tool-card {
    padding: 12px;
  }
  
  .tool-name {
    font-size: 16px;
  }
  
  .tool-image {
    height: 100px;
  }
}
</style>