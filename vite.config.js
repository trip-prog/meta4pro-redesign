import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/meta4pro-redesign/',
  plugins: [react()],
  build: {
    target: 'es2020'
  }
});
