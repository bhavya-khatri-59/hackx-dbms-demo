import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    proxy: {
      '/api': {
        target: process.env.VITE_API_URL || 'http://localhost:5001', // Your backend server's address
        changeOrigin: true, // Recommended for virtual hosted sites
        secure: false,      // Can be false if your backend is http
        rewrite: (path) => {
          // If we're using VITE_API_URL, don't rewrite the path
          if (process.env.VITE_API_URL) {
            return path;
          }
          return path;
        }
      },
    },
  },
});