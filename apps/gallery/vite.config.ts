import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Actions sets GITHUB_REPOSITORY as "owner/repo" — derive the Pages
// project-site base path ("/repo/") from it automatically so nobody has to
// remember to update this by hand when the repo is renamed. Falls back to
// "/" for local dev and for a user/org root site (<owner>.github.io).
const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1]
const base = process.env.VITE_BASE_PATH ?? (repoName ? `/${repoName}/` : '/')

// https://vite.dev/config/
export default defineConfig({
  base,
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
