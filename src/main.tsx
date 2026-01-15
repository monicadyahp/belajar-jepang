// Tambahkan ini di main.tsx jika ingin lebih bersih
import { registerSW } from 'virtual:pwa-register'

const updateSW = registerSW({
  onNeedRefresh() {
    if (confirm('Aplikasi diperbarui. Refresh sekarang?')) {
      updateSW()
    }
  },
})