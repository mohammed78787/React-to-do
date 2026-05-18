import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  base: "/React-to-do/",
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    VitePWA({
      registerType: 'autoUpdate',
      base: '/React-to-do/',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}']
      },
      manifest: {
        name: 'React To Do',
        short_name: 'To Do',
        theme_color: '#ffffff',
        start_url: '/React-to-do/',
        scope: '/React-to-do/',
        display: 'standalone',
        icons: [
          { src: '/React-to-do/icon-192.png', sizes: '192x192', type: 'image/png' },
          { src: '/React-to-do/icon-512.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
})