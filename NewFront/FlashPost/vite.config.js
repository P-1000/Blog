import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    build: {
      rollupOptions: {},
    },
    optimizeDeps: {
      include: ["react-router-dom", "@editorjs/code"],
    },
    resolve: {
      alias: {
      },
    },
  };
});
