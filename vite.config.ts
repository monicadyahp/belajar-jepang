import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react' // Pastikan ini 'plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'J-Learn Pastel',
        short_name: 'J-Learn',
        description: 'Aplikasi Belajar Hiragana & Katakana',
        theme_color: '#ebf4ff',
        background_color: '#ebf4ff',
        display: 'standalone',
        icons: [
          {
            src: 'pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
})