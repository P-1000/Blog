import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        external: [
          'react',
          'react-dom',
          'react-router-dom',
          'react-redux',
          'redux',
          'redux-thunk',
          'axios',
          'editorjs',
          'imagekit',
        ],
      },
    },
    server: {
      port: 5173,
    },
    optimizeDeps: {
      include: ['react-router-dom'],
    },
    resolve: {
      alias: {
        // Define any custom aliases as needed
      },
    },
  };
});
