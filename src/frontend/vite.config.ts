import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
  optimizeDeps: {
    esbuildOptions: {
      define: {
        global: 'globalThis',
      },
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
      },
    },
  },
  plugins: [
    react(),
  ],
  define: {
    global: 'globalThis',
    'process.env': JSON.stringify({
      ...process.env,
      CANISTER_ID_BACKEND: 'uxrrr-q7777-77774-qaaaq-cai',
      NODE_ENV: process.env.NODE_ENV || 'development'
    })
  },
});