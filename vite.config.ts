import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(() => {
    return {
      plugins: [react()],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
          '@styles': path.resolve(__dirname, './styles'),
          '@components': path.resolve(__dirname, './components'),
          '@hooks': path.resolve(__dirname, './hooks'),
        }
      },
      css: {
        postcss: './postcss.config.cjs',
      },
      // Base path set to root to ensure paths resolve correctly
      base: '/',
      // Enable SPA history mode for proper client-side routing
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        // Generate a special entry point for SPA mode
        rollupOptions: {
          input: {
            main: path.resolve(__dirname, 'index.html'),
          },
        },
      },
      // Server settings for development
      server: {
        hmr: true,
        // Handle client-side routing during development
        historyApiFallback: true
      }
    };
});
