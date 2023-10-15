// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import proxy from 'vite-plugin-proxy';

// Define your backend server URL
const backendServerUrl = 'http://localhost:8080';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()], // Add this line
  // server:{
  //   proxy:{
  //     '/api':{
  //       target: backendServerUrl,
  //       changeOrigin: true,
  //       // rewrite: (path) => path.replace(/^\/api/, ''),
  //     },
  //   }
  // }
});
