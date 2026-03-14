import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  // 本地开发服务器配置
  server: {
    port: 3000,
    open: true
  }
})