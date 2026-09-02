# Product Backlog: Iqra2 (CMS & Frontend)

Berikut adalah daftar rincian tugas teknis berdasarkan fase-fase *Sprint Plan* yang baru.

## 🟢 Selesai (Completed)
- [x] **Monorepo Setup:** Pindahkan `.env` ke root, setup git tunggal, konfigurasi pnpm-workspace.
- [x] **Database Cleanup:** Hapus skema PPDB dan Kehadiran. Sesuaikan dengan `DB-SCHEMA.md` yang baru.
- [x] **MCP Integration:** Pasang *tools* Neon Postgres dan Browser Automation.

## 🟡 Sprint 6: Neon Auth & Roles
- [ ] **Database Migration:** Update `enum Role` di `backend/prisma/schema.prisma` menjadi `SUPER_ADMIN, CONTRIBUTOR, EDITOR, SUBSCRIBER` lalu jalankan `db push`.
- [ ] **Backend Auth Refactor:** Hapus paket `@nestjs/jwt` dan `bcryptjs`. Pasang `jwks-rsa`. Ubah `jwt.strategy.ts` untuk memverifikasi token eksternal. Hapus *endpoint* login lokal.
- [ ] **Frontend Login Flow:** Integrasikan halaman login klien agar menerima token JWT dari *provider* Neon Auth dan menyimpannya di *cookies/local storage* untuk otorisasi API.

## 🟡 Sprint 7: UI & Responsiveness
- [ ] **Wireframe to JSX:** Konversi `docs/wireframes/01-homepage.html` hingga `06-kontak.html` ke dalam format komponen NextJS.
- [ ] **Mobile Layout:** Terapkan standar `antislop-layoutmobile`. Buat *hamburger menu* untuk Navbar, susun *Hero image* berskala dinamis, ubah grid 3-kolom menjadi 1-kolom di layar ponsel.
- [ ] **Design Tokens:** Pastikan semua warna, font, dan bayangan mengacu pada variabel CSS yang ada di `DESIGN.md`. Jangan gunakan hex *hardcoded*.

## 🟡 Sprint 8: Full Dynamic Content (CMS)
- [ ] **Dynamic Navigation:** Buat API *endpoint* untuk mengambil dan memperbarui `menu_items`. Sambungkan Navbar *frontend* agar *me-render* menu secara dinamis dari database.
- [ ] **Site Settings API:** Bangun *endpoint* CRUD untuk `site_settings` (seperti nama sekolah, tautan sosial media, teks sambutan). Integrasikan dengan *footer* dan halaman profil.
- [ ] **Admin Dashboard UI:** Buat antarmuka di NextJS bagi admin untuk:
  - Mengatur Menu Dinamis.
  - Memperbarui Konfigurasi Situs.
  - Menulis dan Mengelola Artikel (Tabel `posts`).
- [ ] **RBAC Guard:** Buat *Guard* di NestJS untuk mengecek peran (contoh: *Subscriber* dilarang mengedit tulisan, *Editor* bisa menyetujui artikel).

## 🟡 Sprint 9: Deployment
- [ ] **E2E Testing:** Buat skrip *testing* sederhana menggunakan *Playwright* untuk memastikan fungsi dasar CMS (login, baca berita) berjalan sempurna.
- [ ] **Production Build:** Pastikan `pnpm build` sukses tanpa galat tipe (*Type Errors*) di kedua *workspace*.
- [ ] **Deploy Database:** Verifikasi koneksi Neon dan migrasi produksi akhir.
- [ ] **Host Applications:** Unggah aplikasi ke platform Vercel/VPS dan atur variabel lingkungan (*Environment Variables*) produksi.
