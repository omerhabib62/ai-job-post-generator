import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import Inspect from 'vite-plugin-inspect'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    Inspect()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    hmr: true,
    open: true
  }
})
