import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-portfolio-assets',
      closeBundle() {
        const srcAssets = path.resolve('assets');
        const destAssets = path.resolve('dist/assets');
        if (fs.existsSync(srcAssets)) {
          if (!fs.existsSync(destAssets)) {
            fs.mkdirSync(destAssets, { recursive: true });
          }
          fs.cpSync(srcAssets, destAssets, { recursive: true, force: true });
        }
      }
    }
  ],
  base: './',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  server: {
    port: 3000,
    open: false
  },
  preview: {
    port: 3000,
    open: false
  }
});
