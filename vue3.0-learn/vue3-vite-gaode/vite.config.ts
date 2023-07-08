import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
//需要npm install @types/node来安装node的ts声明文件，
//为什么需要安装node的ts声明文件，因为path是node内置的。
import path from 'path' 

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve:{
     //配置路径别名
     alias:{
      '@':path.resolve(__dirname,'./src'),
     }
  },
  server: {
    open: true,
    host: true,
    port: 9547,
  },
});
