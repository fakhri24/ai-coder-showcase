# Menambah Karya Baru

Ada dua mode hosting untuk sebuah karya — pilih sesuai situasi:

- **`embedded`** — source code karya ikut masuk ke repo ini (`works/<slug>/`) dan ikut ter-build jadi bagian dari situs yang sama (`/works/<slug>/`). Cocok untuk karya baru atau siswa yang belum punya deploy sendiri.
- **`external`** — karya sudah di-deploy sendiri oleh siswa (misalnya GitHub Pages repo mereka sendiri). Cukup simpan thumbnail + URL live-nya, tidak perlu source code masuk ke repo ini.

## Mode `embedded`

1. Scaffold folder karya baru dari template:
   ```bash
   npm run new-work -- <slug-karya>
   ```
   Contoh: `npm run new-work -- snake-game` (pakai kebab-case, huruf kecil, tanpa spasi).

   Ini akan menyalin `works/_template/react-vite` ke `works/<slug-karya>/` dengan base path yang sudah otomatis di-set ke `/works/<slug-karya>/`. Kalau karyamu tidak butuh React (cukup HTML/CSS/JS biasa), pakai `works/_template/plain-html` sebagai referensi manual.

2. Bangun karyamu di `works/<slug-karya>/`. Aturan wajib:
   - Kalau punya routing internal sendiri, pakai `HashRouter` (bukan `BrowserRouter`) — GitHub Pages tidak punya server-side rewrite, jadi `BrowserRouter` akan 404 saat deep link/refresh.
   - Jangan ubah `base` path di `vite.config.ts` — harus tetap `/works/<slug-karya>/` supaya asset termuat benar setelah digabung ke situs utama.
   - Simpan thumbnail sebagai `thumbnail.png` (atau `.svg`/`.jpg`) di root folder karya.

3. Tambahkan entry di registry (langkah "Daftarkan di registry" di bawah) dengan `"hostingMode": "embedded"` dan `"externalUrl": null`.

## Mode `external`

1. Buat folder `works/<slug-karya>/` yang isinya **cuma thumbnail** (`thumbnail.png`/`.svg`/`.jpg`) — tidak perlu source code, karena karyanya sudah live di tempat lain.

2. Tambahkan entry di registry dengan `"hostingMode": "external"` dan `"externalUrl"` diisi URL live karyanya (mis. `https://username-siswa.github.io/nama-repo/`).

3. Halaman detail karya akan tetap menampilkan karya via iframe ke URL itu, plus tombol "Buka di tab baru" sebagai fallback kalau iframe-nya diblokir oleh konfigurasi situs siswa.

## Daftarkan di registry (kedua mode)

Tambahkan entry di `apps/gallery/src/features/works-registry/works.json`:

```json
{
  "slug": "<slug-karya>",
  "title": "Judul Karya",
  "description": "Deskripsi singkat.",
  "authorNames": ["Nama Siswa"],
  "category": "game",
  "thumbnailFile": "thumbnail.png",
  "hostingMode": "embedded",
  "externalUrl": null
}
```

Lalu:

1. Admin membuat dokumen Firestore yang cocok di collection `works` (via Firebase Console), dengan field minimal:
   ```json
   { "slug": "<slug-karya>", "starCount": 0 }
   ```
   (field lain seperti title/description sudah cukup dari registry — lihat komentar di `works.ts`)

2. Jalankan `npm run validate:works` untuk memastikan folder, thumbnail, dan kombinasi `hostingMode`/`externalUrl` sudah benar sebelum push.

3. Commit & push (atau buka PR) → GitHub Actions otomatis build & deploy.
