<template>
  <div class="tool-manager-container">
    <h1>工具管理</h1>
    
    <div class="manager-actions">
      <button @click="showAddForm = true" class="btn-add">
        添加工具
      </button>
    </div>
    
    <div v-if="loading" class="loading">
      <p>加载工具中...</p>
    </div>
    
    <div v-else-if="tools.length === 0" class="no-tools">
      <p>暂无工具数据</p>
    </div>
    
    <div v-else class="tool-table-container">
      <table class="tool-table">
        <thead>
          <tr>
            <th>工具名称</th>
            <th>工具简介</th>
            <th>工具类型</th>
            <th>更新日期</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="tool in tools" :key="tool.id">
            <td>{{ tool.name }}</td>
            <td class="description-cell">{{ tool.description }}</td>
            <td>{{ tool.type }}</td>
            <td>{{ formatDate(tool.updateDate) }}</td>
            <td class="actions-cell">
              <button @click="editTool(tool)" class="btn-edit">
                编辑
              </button>
              <button @click="confirmDelete(tool.id)" class="btn-delete">
                删除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- 添加/编辑表单模态框 -->
    <div v-if="showAddForm || (showEditForm && currentTool)" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <ToolForm
              :isEdit="showEditForm"
              :initialData="showEditForm && currentTool ? {
                name: currentTool.name,
                description: currentTool.description,
                type: currentTool.type,
                image: currentTool.image,
                tutorialUrl: currentTool.tutorialUrl,
                websiteUrl: currentTool.websiteUrl
              } : undefined"
              @submit="handleFormSubmit"
              @cancel="closeModal"
            />
      </div>
    </div>
    
    <!-- 删除确认对话框 -->
    <div v-if="showDeleteConfirm" class="modal-overlay" @click="cancelDelete">
      <div class="modal-content confirm-modal" @click.stop>
        <h3>确认删除</h3>
        <p>确定要删除这个工具吗？此操作不可撤销。</p>
        <div class="confirm-actions">
          <button @click="cancelDelete" class="btn-cancel">
            取消
          </button>
          <button @click="deleteTool" class="btn-confirm-delete">
            确认删除
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import ToolForm from './ToolForm.vue';
import type { Tool, ToolFormData } from '../types/tool';
import { getTools, addTool, updateTool, deleteTool as deleteToolService } from '../services/toolService';

// 状态
const tools = ref<Tool[]>([]);
const loading = ref(true);
const showAddForm = ref(false);
const showEditForm = ref(false);
const showDeleteConfirm = ref(false);
const currentTool = ref<Tool | null>(null);
const toolToDelete = ref<string | null>(null);

// 格式化日期
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('zh-CN');
};

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

// 显示编辑表单
const editTool = (tool: Tool) => {
  currentTool.value = tool;
  showEditForm.value = true;
};

// 确认删除
const confirmDelete = (id: string) => {
  toolToDelete.value = id;
  showDeleteConfirm.value = true;
};

// 取消删除
const cancelDelete = () => {
  showDeleteConfirm.value = false;
  toolToDelete.value = null;
};

// 删除工具
const deleteTool = async () => {
  if (!toolToDelete.value) return;
  
  try {
    await deleteToolService(toolToDelete.value);
    await loadTools(); // 重新加载工具列表
    cancelDelete();
  } catch (error) {
    console.error('删除工具失败:', error);
  }
};

// 处理表单提交
const handleFormSubmit = async (formData: ToolFormData) => {
  try {
    if (showEditForm.value && currentTool.value) {
      await updateTool(currentTool.value.id, formData);
    } else {
      await addTool(formData);
    }
    await loadTools(); // 重新加载工具列表
    closeModal();
  } catch (error) {
    console.error(showEditForm.value ? '更新工具失败:' : '添加工具失败:', error);
  }
};

// 关闭模态框
const closeModal = () => {
  showAddForm.value = false;
  showEditForm.value = false;
  currentTool.value = null;
};

// 初始加载
onMounted(() => {
  loadTools();
});
</script>

<style scoped>
.tool-manager-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.tool-manager-container h1 {
  text-align: center;
  margin-bottom: 20px;
  color: #333;
}

.manager-actions {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.btn-add {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s ease;
}

.btn-add:hover {
  background: #3aa876;
}

.loading,
.no-tools {
  text-align: center;
  padding: 60px 20px;
  color: #666;
}

.tool-table-container {
  overflow-x: auto;
}

.tool-table {
  width: 100%;
  border-collapse: collapse;
  background: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
  overflow: hidden;
}

.tool-table th,
.tool-table td {
  padding: 12px 16px;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.tool-table th {
  background: #f8f9fa;
  font-weight: 600;
  color: #333;
}

.tool-table tr:hover {
  background: #f8f9fa;
}

.description-cell {
  max-width: 300px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.actions-cell {
  display: flex;
  gap: 8px;
}

.btn-edit,
.btn-delete {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-edit {
  background: #007bff;
  color: white;
}

.btn-edit:hover {
  background: #0056b3;
}

.btn-delete {
  background: #dc3545;
  color: white;
}

.btn-delete:hover {
  background: #c82333;
}

/* 模态框样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 8px;
  max-width: 500px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  animation: modalFadeIn 0.3s ease;
}

.confirm-modal {
  max-width: 400px;
  padding: 24px;
}

.confirm-modal h3 {
  margin: 0 0 16px 0;
  color: #333;
}

.confirm-modal p {
  margin: 0 0 24px 0;
  color: #666;
}

.confirm-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

.btn-cancel,
.btn-confirm-delete {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.btn-cancel {
  background: #f5f5f5;
  color: #666;
}

.btn-cancel:hover {
  background: #e0e0e0;
}

.btn-confirm-delete {
  background: #dc3545;
  color: white;
}

.btn-confirm-delete:hover {
  background: #c82333;
}

@keyframes modalFadeIn {
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tool-manager-container {
    padding: 12px;
  }
  
  .manager-actions {
    justify-content: center;
  }
  
  .tool-table {
    font-size: 14px;
  }
  
  .tool-table th,
  .tool-table td {
    padding: 8px 12px;
  }
  
  .description-cell {
    max-width: 150px;
  }
  
  .actions-cell {
    flex-direction: column;
    gap: 4px;
  }
  
  .modal-content {
    width: 95%;
    margin: 20px;
  }
}
</style>