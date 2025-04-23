<template>
  <div class="login-container">
    <div class="auth-box">
      <h2>欢迎登录</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <input type="text" placeholder="用户名" v-model="username" />
        </div>
        <div class="form-group">
          <input type="password" placeholder="密码" v-model="password" />
        </div>
        <button type="submit">立即登录</button>
      </form>
    </div>
    <div class="gradient-bg"></div>
    <div class="gradient-bg gradient-bg2"></div>
    <div class="gradient-bg gradient-bg3"></div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const username = ref('');
const password = ref('');

const handleLogin = () => {
  router.push('/');
};
</script>

<style scoped>
.login-container {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gradient-bg {
  position: absolute;
  width: 500px;
  height: 500px;
  background: linear-gradient(45deg, #ff6b6b, #ff8e53);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: gradientFlow 20s infinite linear;
  opacity: 0.3;
  filter: blur(60px);
}

.gradient-bg2 {
  background: linear-gradient(45deg, #4ecdc4, #45b7af);
  animation-delay: -5s;
  top: 20%;
  left: 20%;
}

.gradient-bg3 {
  background: linear-gradient(45deg, #ff9a9e, #fad0c4);
  animation-delay: -10s;
  top: 60%;
  right: 10%;
}

@keyframes gradientFlow {
  0% {
    transform: rotate(0deg) scale(1);
  }
  50% {
    transform: rotate(180deg) scale(1.2);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

.auth-box {
  position: relative;
  z-index: 2;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(10px);
  padding: 2.5rem;
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  max-width: 400px;
}

h2 {
  color: rgba(255, 255, 255, 0.9);
  text-align: center;
  margin-bottom: 2rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

input {
  width: 100%;
  padding: 12px 20px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

button {
  width: 100%;
  padding: 12px;
  background: rgba(255, 255, 255, 0.2);
  border: none;
  border-radius: 8px;
  color: white;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: translateY(-2px);
}
</style>