import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: keep this base path as-is — it must match where this work
// ends up nested under the gallery site (/works/__SLUG__/), otherwise its
// assets will 404 once deployed. scripts/new-work.mjs fills in __SLUG__
// automatically when scaffolding from this template.
export default defineConfig({
  base: '/works/__SLUG__/',
  plugins: [react()],
})
