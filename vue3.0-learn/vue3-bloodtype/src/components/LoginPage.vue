<template>
  <div class="login-container">
    <h2>用户登录</h2>
    <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label>用户名：</label>
        <input 
          v-model="username"
          type="text"
          required
          :class="{ 'error': errors.username }"
          @input="clearError('username')"
        >
        <span class="error-msg">{{ errors.username }}</span>
      </div>

      <div class="form-group">
        <label>密码：</label>
        <input 
          v-model="password"
          type="password" 
          required
          :class="{ 'error': errors.password }"
          @input="clearError('password')"
        >
        <span class="error-msg">{{ errors.password }}</span>
      </div>

      <button type="submit" :disabled="isSubmitting" class="login-btn">
        {{ isSubmitting ? '登录中...' : '登录' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');
const isSubmitting = ref(false);
const errors = ref({
  username: '',
  password: ''
});

const validateForm = () => {
  let isValid = true;
  if (!username.value) {
    errors.value.username = '请输入用户名';
    isValid = false;
  }
  if (!password.value) {
    errors.value.password = '请输入密码';
    isValid = false;
  } else if (password.value.length < 6) {
    errors.value.password = '密码至少6位';
    isValid = false;
  }
  return isValid;
};

const clearError = (field) => {
  errors.value[field] = '';
};

const handleLogin = async () => {
  if (!validateForm()) return;
  
  isSubmitting.value = true;
  // 模拟登录请求
  await new Promise(resolve => setTimeout(resolve, 1500));
  localStorage.setItem('isAuthenticated', 'true');
  router.push('/home');
  isSubmitting.value = false;
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 4rem auto;
  padding: 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  color: #495057;
}

input {
  width: 100%;
  padding: 0.75rem;
  border: 2px solid #e9ecef;
  border-radius: 6px;
  transition: border-color 0.3s;
}

input.error {
  border-color: #ff6b6b;
}

.error-msg {
  color: #ff6b6b;
  font-size: 0.875rem;
  display: block;
  margin-top: 0.5rem;
}

.login-btn {
  width: 100%;
  padding: 12px;
  background: #4263eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s;
}

.login-btn:disabled {
  background: #748ffc;
  cursor: not-allowed;
}
</style>