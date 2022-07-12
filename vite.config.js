import { fileURLToPath, URL } from 'url'
import path from 'path'

import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    lib: {
      entry:  path.resolve('src/main.js'),
      name: 'DarkModeSwitch',
      fileName: format => `index.${format}.js`
    },
  }
})
