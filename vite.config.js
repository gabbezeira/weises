import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['babel-plugin-styled-components'],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components'),
      '@pages': path.resolve(__dirname, './src/components/pages'),
      '@sections': path.resolve(__dirname, './src/components/sections'),
      '@common': path.resolve(__dirname, './src/components/common'),
      '@layout': path.resolve(__dirname, './src/components/layout'),
      '@ui': path.resolve(__dirname, './src/components/ui'),
      '@admin': path.resolve(__dirname, './src/components/Admin'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@utils': path.resolve(__dirname, './src/utils'),
      '@data': path.resolve(__dirname, './src/data'),
      '@locales': path.resolve(__dirname, './src/locales'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@context': path.resolve(__dirname, './src/context'),
    },
  },
});
