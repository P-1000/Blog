import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        external: [
          
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
