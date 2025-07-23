import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  base: './', // ✅ ensures relative paths for static assets
  build: {
    outDir: 'dist', // ✅ tells Vite where to build the app
  },
})
