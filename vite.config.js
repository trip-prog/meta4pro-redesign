import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

export default defineConfig({
  base: '/meta4pro-redesign/',
  plugins: [react()],
  build: {
    target: 'es2020',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        bold: resolve(import.meta.dirname, 'bold/index.html')
      }
    }
  }
});
