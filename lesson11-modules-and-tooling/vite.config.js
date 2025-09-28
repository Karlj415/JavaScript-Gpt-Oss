import { defineConfig } from 'vite';

export default defineConfig({
  // Build configuration
  build: {
    target: 'es2020',
    outDir: 'dist',
    sourcemap: true,
    minify: 'esbuild',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['date-fns', 'lodash-es'],
        },
      },
    },
  },

  // Development server
  server: {
    port: 3000,
    open: true,
    cors: true,
    host: true, // Allow external connections
  },

  // CSS configuration
  css: {
    devSourcemap: true,
  },

  // Define global constants
  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
  },

  // Optimization
  optimizeDeps: {
    include: ['date-fns', 'lodash-es'],
  },
});