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
      // Simple performance optimization
      server: {
        hmr: true
      }
    };
});
