import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

// Import PWA dengan penanganan error sederhana
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Aplikasi diperbarui. Refresh sekarang?')) {
      updateSW()
    }
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)