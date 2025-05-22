/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    tsconfig: './tsconfig.app.json',
    globals: true,
    environment: 'jsdom',
  },
});
