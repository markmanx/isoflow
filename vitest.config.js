
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      'src': path.resolve(__dirname, './src'),
      'chroma-js': path.resolve(__dirname, './src/__mocks__/chromaMock.ts'),
    },
  },
  test: {
    include: ['**/*.test.tsx', '**/*.test.ts'],
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./src/__mocks__/setupTests.ts'],
    transformMode: {
      web: [/\.[jt]sx?$/],
    },
    css: {
      modules: {
        classNameStrategy: 'non-scoped'
      }
    }
  },
  define: {
    PACKAGE_VERSION: JSON.stringify(process.env.npm_package_version || '1.1.1'),
  },
  assetsInclude: ['**/*.svg'],
})