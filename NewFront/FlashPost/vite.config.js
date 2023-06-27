// import { defineConfig } from 'vite';
// import react  from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     fs: {
//       strict: false,
//     },
//     historyApiFallback: true,
//   },
// });

// import { defineConfig } from 'vite';
// import react  from '@vitejs/plugin-react';

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     fs: {
//       strict: false,
//     },
//     historyApiFallback: true,
//   },
// });

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    fs: {
      strict: false,
    },
    historyApiFallback: true,
  },
  build: {
    target: 'es2017',
    outDir: 'dist',
    minify: true,
    css: {
      extract: false,
    },
  },
});

