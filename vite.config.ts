import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  if (mode === 'live-demo') {
    return {
      base: './',
      plugins: [vue()],
      test: {
        globals: true,
      },
      resolve: {
        alias: {
          '~': resolve(__dirname, 'src', 'Vue3ParallaxPlugin'),
        },
      },
      build: {
        rollupOptions: {
          input: ['index.html'],
        },
      },
    }
  } else {
    return {
      plugins: [vue()],
      test: {
        globals: true,
        setupFiles: 'src/setupTests.ts',
        includeSource: ['src/**/*.spec.ts', 'src/**/*.test.ts'],
      },
      resolve: {
        alias: {
          '~': resolve(__dirname, 'src', 'Vue3ParallaxPlugin'),
        },
      },
      build: {
        lib: {
          entry: resolve(__dirname, 'src/Vue3ParallaxPlugin/index.ts'),
          name: 'Vue3-parallax',
          fileName: 'vue3-parallax',
        },
        rollupOptions: {
          external: ['vue'],
          output: {
            globals: {
              vue: 'Vue',
            },
          },
        },
      },
    }
  }
})
