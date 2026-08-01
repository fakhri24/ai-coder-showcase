import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const rootElement = document.getElementById('root')!

// Dynamic import so a bad/missing Firebase config (which throws synchronously
// while shared/lib/firebase.ts is evaluated, before React ever mounts) is
// catchable here instead of producing a silent blank page.
try {
  const { App } = await import('./app/App')
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} catch (error) {
  console.error(error)
  rootElement.innerHTML = `
    <div style="font-family: system-ui, sans-serif; max-width: 480px; margin: 3rem auto; padding: 0 1rem;">
      <h1>Firebase belum dikonfigurasi</h1>
      <p>Salin <code>.env.example</code> ke <code>apps/gallery/.env.local</code> dan isi dengan config Firebase project kamu, lalu build/refresh ulang. Lihat README.md untuk langkah lengkapnya.</p>
    </div>
  `
}
