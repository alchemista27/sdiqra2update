# Sprint Plan: Iqra2 Refactoring & Monorepo Migration

Dokumen ini merangkum rencana kerja (sprint) untuk migrasi project Iqra2 menjadi pnpm monorepo (NextJS & NestJS) serta penghapusan fitur-fitur lama.

## Sprint 1: Initial Cleanup & Monorepo Setup
**Goal:** Membersihkan codebase dari fitur yang tidak lagi digunakan dan mengatur struktur dasar monorepo.
- [ ] Menghapus direktori `mobile` (React Native) sepenuhnya dari codebase.
- [ ] Menginisialisasi `pnpm-workspace.yaml` untuk `frontend` dan `backend`.
- [ ] Menambahkan `package.json` di root untuk menjalankan script monorepo.
- [ ] Menghapus folder rute PPDB dan Absensi di `frontend` (`app/admin/ppdb`, `app/admin/attendance`, `app/absen`, dll).

## Sprint 2: Backend Migration (Express to NestJS)
**Goal:** Memigrasi backend dari Express ke NestJS dan merampingkan database.
- [ ] Inisialisasi project NestJS di dalam folder `backend`.
- [ ] Memperbarui `prisma/schema.prisma` (Hapus tabel terkait PPDB, Absensi, dan MenuItem).
- [ ] Migrasi modul Autentikasi (Login, JWT) ke NestJS.
- [ ] Migrasi modul CMS (Posts, Pages, Settings) ke NestJS.
- [ ] Memastikan koneksi Prisma dan API berjalan lancar.

## Sprint 3: Frontend Routing & CMS Adjustment
**Goal:** Mengunci rute halaman frontend dan menyesuaikan CMS Admin.
- [ ] Membuat struktur rute statis di NextJS: Homepage (`/`), Tentang Sekolah (`/tentang-sekolah`), Sambutan (`/tentang-sekolah/sambutan`), Berita (`/berita`), dan Kontak (`/kontak`).
- [ ] Memperbarui `Navbar.tsx` agar menggunakan navigasi statis (bukan dari database).
- [ ] Memodifikasi panel Admin NextJS agar hanya bisa mengedit halaman-halaman statis tersebut (menghilangkan fitur "Tambah Halaman" dan "Edit Menu").
- [ ] Menambahkan *redirect* permanen di `next.config.ts` untuk rute `/ppdb` ke `https://ppdbalfida.vercel.app`.

## Sprint 4: UI/UX Implementation (Pending)
**Goal:** Menerapkan desain tampilan baru yang akan diinfokan lebih lanjut.
- [ ] Menerima dan meninjau aset desain di folder `docs/`.
- [ ] Mengimplementasikan desain ke dalam komponen-komponen NextJS.
- [ ] Penyesuaian responsivitas (*mobile-friendly*) untuk web.

## Sprint 5: Monorepo Consolidation
**Goal:** Menyatukan repositori Git dan konfigurasi `.env` secara terpusat.
- [x] Menghapus `frontend/.git` dan `backend/.git`.
- [x] Menginisialisasi repositori Git tunggal di *root* dan menambahkan `.gitignore`.
- [x] Membuat `.env` sentral di *root*.
- [x] Mengonfigurasi `frontend` dan `backend` agar membaca `.env` dari *root* (menggunakan *symlink*).
