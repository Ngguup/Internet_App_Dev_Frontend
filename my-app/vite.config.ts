import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), VitePWA({})],
  base: '/Internet_App_Dev_Frontend/',
  server: {
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    },
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/"),
      },
    },
    watch: { 
        usePolling: true,
    }, 
    host: true, 
    strictPort: true, 
    port: 3000, 
  },
});
