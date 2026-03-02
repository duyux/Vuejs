<template>
  <div class="tool-form-container">
    <h2>{{ isEdit ? '编辑工具' : '添加新工具' }}</h2>
    <form @submit.prevent="handleSubmit" class="tool-form">
      <div class="form-group">
        <label for="name">工具名称 <span class="required">*</span></label>
        <input
          id="name"
          v-model="formData.name"
          type="text"
          placeholder="请输入工具名称"
          required
        >
      </div>

      <div class="form-group">
        <label for="description">工具简介 <span class="required">*</span></label>
        <textarea
          id="description"
          v-model="formData.description"
          placeholder="请输入工具简介"
          rows="4"
          required
        ></textarea>
      </div>

      <div class="form-group">
        <label for="type">工具类型 <span class="required">*</span></label>
        <select
          id="type"
          v-model="formData.type"
          required
        >
          <option value="">请选择工具类型</option>
          <option v-for="type in toolTypes" :key="type" :value="type">
            {{ type }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label for="image">工具图片</label>
        <input
          id="image"
          v-model="formData.image"
          type="url"
          placeholder="请输入工具图片URL（可选）"
        >
      </div>

      <div class="form-group">
        <label for="tutorialUrl">教程链接</label>
        <input
          id="tutorialUrl"
          v-model="formData.tutorialUrl"
          type="url"
          placeholder="请输入工具教程链接（可选）"
        >
      </div>

      <div class="form-group">
        <label for="websiteUrl">工具网址</label>
        <input
          id="websiteUrl"
          v-model="formData.websiteUrl"
          type="url"
          placeholder="请输入工具官方网址（可选）"
        >
      </div>

      <div class="form-actions">
        <button type="button" @click="handleCancel" class="btn-cancel">
          取消
        </button>
        <button type="submit" class="btn-submit">
          {{ isEdit ? '更新' : '添加' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ToolFormData } from '../types/tool';
import { toolTypes } from '../data/mockData';

const props = defineProps<{
  isEdit?: boolean;
  initialData?: ToolFormData;
}>();

const emit = defineEmits<{
  submit: [data: ToolFormData];
  cancel: [];
}>();

// 表单数据
const formData = ref<ToolFormData>({
  name: '',
  description: '',
  type: '',
  image: '',
  tutorialUrl: '',
  websiteUrl: ''
});

// 初始化表单数据（编辑模式）
onMounted(() => {
  if (props.isEdit && props.initialData) {
    formData.value = { ...props.initialData };
  }
});

// 处理表单提交
const handleSubmit = () => {
  // 去除空字符串字段
  const submitData = {
    ...formData.value,
    image: formData.value.image || undefined,
    tutorialUrl: formData.value.tutorialUrl || undefined,
    websiteUrl: formData.value.websiteUrl || undefined
  };
  
  emit('submit', submitData);
};

// 处理取消
const handleCancel = () => {
  emit('cancel');
};
</script>

<style scoped>
.tool-form-container {
  max-width: 600px;
  margin: 0 auto;
  background: #fff;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.tool-form-container h2 {
  margin: 0 0 20px 0;
  color: #333;
  font-size: 20px;
}

.tool-form {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 14px;
  font-weight: 500;
  color: #333;
}

.required {
  color: #e74c3c;
}

.form-group input,
.form-group textarea,
.form-group select {
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s ease;
}

.form-group input:focus,
.form-group textarea:focus,
.form-group select:focus {
  outline: none;
  border-color: #42b983;
}

.form-group textarea {
  resize: vertical;
  min-height: 100px;
}

.form-actions {
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
}

.btn-cancel,
.btn-submit {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
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

.btn-submit {
  background: #42b983;
  color: white;
}

.btn-submit:hover {
  background: #3aa876;
}

.btn-submit:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .tool-form-container {
    padding: 16px;
  }
  
  .form-actions {
    flex-direction: column;
  }
  
  .btn-cancel,
  .btn-submit {
    width: 100%;
  }
}
</style>