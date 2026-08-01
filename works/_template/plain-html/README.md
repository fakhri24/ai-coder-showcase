# Template: Plain HTML/CSS/JS

Untuk karya yang tidak butuh build step (React/Vite dsb).

## Cara pakai

1. Copy folder ini ke `works/<slug-karya-kamu>/`.
2. Edit `index.html`, `style.css`, `script.js` sesuai karyamu.
3. Ganti `thumbnail.svg` dengan gambar preview karyamu (boleh `.png`/`.jpg`, sesuaikan path di registry nanti).
4. Kalau karyamu punya routing/navigasi sendiri berbasis URL, pakai hash (`#/halaman`) — jangan pakai path browser biasa, karena GitHub Pages tidak bisa redirect server-side.

Folder ini (tanpa `package.json`) di-copy apa adanya oleh `scripts/build-all.mjs` ke `dist/works/<slug>/` — tidak ada proses build.
