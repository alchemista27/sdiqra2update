# Product Backlog: Iqra2

Berikut adalah daftar tugas terperinci (Backlog) yang harus diselesaikan untuk mencapai target *refactoring*.

## High Priority (Critical Path)
- [x] **Delete Mobile App:** Hapus folder `mobile` karena aplikasi React Native tidak lagi digunakan.
- [x] **Setup pnpm Workspace:** Buat `pnpm-workspace.yaml` dan root `package.json` untuk menjalankan `frontend` dan `backend` secara bersamaan.
- [x] **Clean Prisma Schema:** Hapus model `Parent`, `Registration`, `Employee`, `AttendanceLog`, dll dari `backend/prisma/schema.prisma`.
- [x] **Clean Frontend Routes:** Hapus direktori routing terkait fitur lama di NextJS (contoh: `app/admin/ppdb`, `app/absen`, `app/admin/menu`).

## Medium Priority (Core Features)
- [x] **NestJS Bootstrap:** Inisialisasi ulang folder `backend` menggunakan arsitektur NestJS.
- [x] **Migrate Auth Service:** Pindahkan logika login dan verifikasi JWT dari Express ke NestJS AuthGuard.
- [x] **Migrate CMS API:** Buat NestJS Controller dan Service untuk mengelola Berita (Posts) dan Pengaturan (Settings/Pages).
- [x] **Hardcode Navigation:** Ubah `frontend/src/components/layout/Navbar.tsx` agar menampilkan link menu secara statis.
- [ ] **Restrict Page Editor:** Sesuaikan CMS di NextJS agar admin hanya bisa mengedit konten dari halaman utama (Homepage, Tentang, Berita, Kontak) tanpa bisa menambah halaman baru.

## Low Priority (Enhancements)
- [x] **PPDB Redirect:** Tambahkan aturan redirect di `next.config.ts` agar request ke `/ppdb` diarahkan ke `https://ppdbalfida.vercel.app`.
- [ ] **Remove Galeri (Opsional):** Konfirmasi lebih lanjut apakah rute dan fitur Galeri perlu dihapus dari frontend.

## Desain & UI
- [x] **New UI Implementation:** Terapkan desain antarmuka baru berlandaskan `DESIGN.md` (menggunakan *design tokens* untuk *colors*, *typography*, & *components*) dengan prinsip *anti-slop*.

## Technical Debt & DevOps
- [x] **Monorepo Git Setup**: Gabungkan repo frontend dan backend ke root.
- [x] **Centralized ENV**: Pindahkan `.env` ke root dan buat symlink.
