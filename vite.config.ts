import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react-swc'
    import { fileURLToPath, URL } from "node:url";

    export default defineConfig({
      plugins: [react()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      server: {
        allowedHosts: true,
        host: '0.0.0.0',
        port: 5173,
        cors: false,
        hmr: {
          port: 5173,
          host: '0.0.0.0'
        },
        watch: {
          usePolling: true,
          interval: 1000
        }
      },
      optimizeDeps: {
        force: true
      },
      css: {
        postcss: './postcss.config.js'
      }
    })