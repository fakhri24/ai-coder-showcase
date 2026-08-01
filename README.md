# AI Coder Showcase

Galeri karya (website/app/game) yang dibuat anggota ekskul **AI Coder**. Siapa saja bisa mencoba karya tanpa login; user yang login dengan Google bisa memberi ⭐ dan komentar.

## Struktur Repo

```
apps/gallery/     Aplikasi utama (React + TypeScript + Vite)
works/<slug>/     Karya-karya ekskul, tiap satu subfolder, ikut ke-build ke /works/<slug>/
works/_template/  Starter template untuk karya baru (react-vite & plain-html)
scripts/          Script orkestrasi build multi-paket
.github/workflows Pipeline CI/CD ke GitHub Pages
```

## Menjalankan Secara Lokal

```bash
npm install
cp .env.example apps/gallery/.env.local   # isi dengan config Firebase project kamu
npm run dev                                # jalankan gallery app di localhost
```

## Build Penuh (gallery + semua karya)

```bash
npm run build      # hasil di dist/
npx serve dist      # cek hasil build secara lokal sebelum push
```

## Menambah Karya Baru

Lihat [CONTRIBUTING.md](./CONTRIBUTING.md).

## Setup Firebase (sekali saja, manual)

1. Buat project di [Firebase Console](https://console.firebase.google.com/).
2. Authentication → Sign-in method → aktifkan **Google**.
3. Authentication → Settings → Authorized domains → tambahkan `localhost` dan `<username-atau-org>.github.io`.
4. Firestore Database → buat database (mode production) → deploy isi `firestore.rules` (lihat `apps/gallery/firestore.rules`) lewat Firebase Console atau Firebase CLI (`firebase deploy --only firestore:rules`).
5. Project Settings → General → tambah Web App → salin config ke `apps/gallery/.env.local` (untuk lokal) dan ke **GitHub repo → Settings → Secrets and variables → Actions** (untuk deploy otomatis), lihat `.env.example` untuk daftar variabel yang dibutuhkan.

## Deploy

Push ke branch `main` akan otomatis build & deploy ke GitHub Pages lewat GitHub Actions (`.github/workflows/deploy.yml`). Pastikan repo Settings → Pages → Source diset ke **"GitHub Actions"**.
