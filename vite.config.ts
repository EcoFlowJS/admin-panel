import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import autoprefixer from "autoprefixer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/admin",
  server: {
    port: 3000,
    proxy: {
      "/editor/flow": {
        target: "http://localhost:3001/",
        changeOrigin: true,
      },
      "/editor/schema": {
        target: "http://localhost:3002/",
        changeOrigin: true,
      },
    },
  },
});

