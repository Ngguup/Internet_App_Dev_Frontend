import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

import mkcert from 'vite-plugin-mkcert'
import fs from 'fs';
import path from 'path';
import { VitePWA } from 'vite-plugin-pwa';
import { dest_root, api_proxy_addr } from './target_config'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), mkcert(), VitePWA({})],
  // plugins: [react(), VitePWA({})],
  // base: '/Internet_App_Dev_Frontend/',
  // base: './',
  base: dest_root,
  server: {
    // https:{
    //   key: fs.readFileSync(path.resolve(__dirname, 'cert.key')),
    //   cert: fs.readFileSync(path.resolve(__dirname, 'cert.crt')),
    // },
    https:{
      key: fs.readFileSync(path.resolve(__dirname, 'localhost+2-key.pem')),
      cert: fs.readFileSync(path.resolve(__dirname, 'localhost+2.pem')),
    },
    proxy: {
      "/api": {
        target: api_proxy_addr,
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, ""),
        secure: false,
      },
    },
    watch: { 
        usePolling: true,
    }, 
    host: true,
    // host: "0.0.0.0", 
    strictPort: true, 
    port: 3000, 
  },
});
