/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: 'happy-dom',
    setupFiles: ['./src/setupTests.ts']
  },
  resolve: {
    alias: {
      '@shared': '/src/shared',
      '@assets': '/src/assets',
      '@contexts': '/src/contexts'
    }
  },
})
