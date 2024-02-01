/// <reference types="vitest" />
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: '/standup-timer/',
  test: {
    // vitest specific configuration.

    // The testing environment. Simulate a DOM, so that Vue Components can be tested too.
    environment: 'happy-dom'
  }
})
