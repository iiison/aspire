/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true, // use global test(), expect() etc.
    environment: 'jsdom', // simulates browser DOM for tests
    setupFiles: './src/setupTests.ts', // optional, for jest-dom matchers & setup
    coverage: {
      reporter: ['text', 'html'],
    },
  },
});
