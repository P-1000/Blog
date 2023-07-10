// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import { resolve } from 'path'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
//   build: {
//     rollupOptions: {
//       input: {
//         main: resolve(__dirname, 'index.html'),
//         // nested: resolve(__dirname, 'nested/index.html'),
//       },
//     },
//   },
// })


import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {
        input: {
          main: '/src/index.js',
        },
      },
    },
    server: {
      // Adjust the server configuration as needed
      // For example, specify the port and set up a proxy if necessary
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




// import { defineConfig } from 'vite';
// import { createReactPlugin } from 'vite-plugin-react';
// import ssr from 'vite-plugin-ssr/plugin';

// export default defineConfig({
//   plugins: [
//     createReactPlugin(),
//     ssr({
//       entry: './src/entry-server.js',
//       clientEntry: './src/entry-client.js',
//       serverOutDir: 'dist/server',
//       clientOutDir: 'dist/client',
//       // Additional options for the plugin
//       // ...
//     }),
//   ],
// });
