# Sim Alfida - Website Resmi SDIT Iqra 2

Sistem Informasi Manajemen dan Website Resmi untuk **SD Islam Terpadu Iqra 2 Kota Bengkulu** (Yayasan Alfida). Proyek ini dibangun menggunakan arsitektur modern (*Monorepo*) yang memisahkan aplikasi *frontend* dan *backend* menggunakan `pnpm workspaces`.

## 🏗️ Struktur Proyek

Proyek ini terdiri dari dua aplikasi utama:

- **`/frontend`** (Next.js 14+ / React)
  Menangani tampilan website publik (Beranda, Profil, Berita, dll.) serta panel Dashboard Admin (CMS). Menggunakan *Tailwind CSS* (desain token kustom) dan *Material Icons*.
- **`/backend`** (NestJS)
  Menangani logika bisnis, API, dan pengelolaan basis data melalui *Prisma ORM*. Mengatur autentikasi JWT dan layanan CRUD untuk CMS (Berita, Kategori, Pengaturan Situs).

Folder tambahan:
- **`/docs`**: Berisi aset proyek, *wireframes*, referensi desain (`DESIGN.md`, `REFERENSI-DESAIN.md`), dan catatan manajemen *sprint*.

## 🚀 Persyaratan Sistem

Pastikan Anda telah menginstal:
- **Node.js** (v18 atau lebih baru)
- **pnpm** (sebagai *package manager*)
- **PostgreSQL** (sebagai basis data)

## 🛠️ Instalasi

1. Kloning repositori ini ke komputer lokal Anda.
2. Jalankan perintah instalasi dari direktori utama (root):
   ```bash
   pnpm install
   ```
3. Konfigurasi *.env*:
   - Di folder `backend/`: salin `.env.example` ke `.env` lalu sesuaikan koneksi `DATABASE_URL`.
   - Di folder `frontend/`: salin `.env.example` ke `.env` (pastikan `NEXT_PUBLIC_API_URL` mengarah ke backend).

## 🗄️ Menyiapkan Basis Data

Pindah ke folder `backend` dan jalankan sinkronisasi Prisma:

```bash
cd backend
npx prisma db push
```

## 🏃‍♂️ Menjalankan Aplikasi (Development)

Untuk pengalaman terbaik, jalankan *backend* dan *frontend* di terminal yang terpisah.

**Terminal 1: Backend (API Server)**
```bash
pnpm run -F backend start:dev
```
*(Berjalan di http://localhost:5000)*

**Terminal 2: Frontend (Next.js)**
```bash
pnpm run -F frontend dev
```
*(Berjalan di http://localhost:3000)*

## 🎨 Panduan Desain (UI/UX)
Pengembangan UI/UX pada *frontend* (terutama panel Admin) harus senantiasa mematuhi dokumen **`DESIGN.md`**. Dilarang keras menggunakan kode *hex literal* secara langsung (seperti `#1B6B44`); gunakanlah CSS Variables token resmi (misal: `var(--color-primary)`, `var(--color-tertiary)`) yang telah disediakan di `frontend/src/app/globals.css`.

## 📜 Lisensi
Hak Cipta &copy; 2026 Yayasan Alfida - SD Islam Terpadu Iqra 2 Kota Bengkulu. All rights reserved.
