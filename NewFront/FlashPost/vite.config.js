import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        external: [
          '@editorjs/code' ,
          'react-syntax-highlighter'
        ],
      },
    },
    server: {
      port: 5173,
      proxy: {
        '/api': {
          target: 'http://localhost:3000',
          changeOrigin: true,
        },
      },
    },
    optimizeDeps: {
      include: ['react-router-dom'],
    },
    resolve: {
      alias: {
        
      },
    },
  };
});