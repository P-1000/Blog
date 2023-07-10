import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
})



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
