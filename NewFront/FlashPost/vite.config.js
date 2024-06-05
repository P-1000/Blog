import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        external: [
          '@editorjs/code'
          // 'react-syntax-highlighter' is removed from here
        ],
      },
    },
    optimizeDeps: {
      include: [
        'react-router-dom',
        'react-syntax-highlighter'  
      ],
    },
    resolve: {
      alias: {
        
      },
    },
  };
});
