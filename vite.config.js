import { defineConfig } from 'vite';

export default defineConfig({
  // Relative paths, so the build works at any address (GitHub Pages subfolder, local server, etc.).
  base: './',
  // The Three.js 3D logo chunk is lazy-loaded, so a larger chunk is expected.
  build: { chunkSizeWarningLimit: 800 },
});
