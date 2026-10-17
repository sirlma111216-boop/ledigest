import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 안내 사이트는 정적 페이지다. Cloudflare Pages 등에 dist 폴더를 그대로 배포한다.
export default defineConfig({
  plugins: [react()],
  base: './',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
  server: {
    port: 5173,
    strictPort: false,
  },
})
