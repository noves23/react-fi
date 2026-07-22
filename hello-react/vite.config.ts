import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      {
        find: /^react-transition-group\/TransitionGroupContext$/,
        replacement: resolve(__dirname, 'node_modules/react-transition-group/cjs/TransitionGroupContext.js'),
      },
    ],
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.ts',
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    deps: {
      inline: ['@mui/material', '@emotion/react', '@emotion/styled'],
    },
  },
})
