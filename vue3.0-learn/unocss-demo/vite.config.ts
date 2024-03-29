import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// 引入Unocss
import Unocss from 'unocss/vite';
import { presetUno, presetAttributify, presetIcons } from 'unocss'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
     Unocss({ // 使用Unocss
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons()],
    })
  ],
})
