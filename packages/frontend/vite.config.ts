import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      // パスエイリアス設定
      'shared': resolve(__dirname, '../shared/src'),
    },
  },
  optimizeDeps: {
    include: ['shared'],
  },
  build: {
    commonjsOptions: {
      include: [/shared/, /node_modules/],
    },
  },
});
