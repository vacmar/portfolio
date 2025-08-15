import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Allow access from other devices
    port: 5173
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    minify: 'esbuild', // Changed from terser to esbuild (faster and included)
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  base: './' // Ensure relative paths work
})
