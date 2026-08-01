# Template: React + Vite + TypeScript

Untuk karya yang butuh React.

## Cara pakai

Jangan copy manual — pakai `npm run new-work -- <slug-karya>` dari root repo. Script itu akan:
- Copy template ini ke `works/<slug-karya>/`
- Mengisi otomatis `__SLUG__` di `vite.config.ts` dan `package.json` jadi slug karyamu

## Aturan penting

- **Jangan ubah `base` di `vite.config.ts`** — harus tetap `/works/<slug-karya>/` supaya asset termuat benar setelah digabung ke situs utama.
- **Kalau butuh routing internal** (halaman/level berbeda dalam karyamu), pakai `HashRouter` dari `react-router-dom`, bukan `BrowserRouter` — GitHub Pages tidak bisa redirect server-side, jadi `BrowserRouter` akan 404 saat deep link/refresh.
- Simpan thumbnail sebagai `thumbnail.png`/`.svg` di root folder karya (sejajar `package.json`), bukan di dalam `src/`.
- `npm install` di folder ini (atau jalankan `npm install` di root repo — ini bagian dari npm workspaces) sebelum `npm run dev`.
