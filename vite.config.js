import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: process.env.GITHUB_PAGES === 'true' ? '/SanWenYuB2B/' : '/',
  plugins: [tailwindcss()],
  preview: {
    allowedHosts: ['.trycloudflare.com'],
  },
})
