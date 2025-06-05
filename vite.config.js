import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'https://web-production-0ba5.up.railway.app',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          // Adding withCredentials on the proxy itself
          proxy.on('proxyReq', (proxyReq) => {
            proxyReq.setHeader('Access-Control-Allow-Credentials', 'true');
          });
        },
      },
    },
  },
});
