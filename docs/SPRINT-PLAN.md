# Sprint Plan: Iqra2 Refactoring & Full CMS Development

Dokumen ini merangkum rencana kerja (sprint) untuk menyempurnakan proyek Iqra2 hingga tahap peluncuran (*deployment*). Proyek ini merupakan pnpm monorepo (NextJS & NestJS) dengan sistem *Full Dynamic CMS* untuk situs SDIT Iqra 2.

## Sprint 1 - 5: Foundation & Cleanups (Selesai)
*Fase ini telah diselesaikan. Meliputi penghapusan fitur lama (PPDB, Absensi), penyatuan monorepo Git, pengaturan `.env` terpusat, dan penyederhanaan skema database menjadi 8 tabel inti CMS.*

---

## Sprint 6: Neon Auth & Role Management (Aktif)
**Goal:** Mengimplementasikan autentikasi pihak ketiga yang didelegasikan ke Neon Auth dan memperbarui struktur peran pengguna.
- [ ] Memperbarui `enum Role` di Prisma (`SUPER_ADMIN, CONTRIBUTOR, EDITOR, SUBSCRIBER`).
- [ ] Menyesuaikan modul Auth NestJS untuk bertindak sebagai *Resource Server* (memverifikasi token via JWKS, menghapus `bcrypt`).
- [ ] Mengintegrasikan alur masuk (*login flow*) di *frontend* dengan token JWT dari eksternal (Clerk/Auth0/Neon).

## Sprint 7: UI/UX Precision & Mobile Responsiveness
**Goal:** Mengonversi desain *wireframe* menjadi komponen React/Next.js murni dengan standar `antislop` dan responsivitas seluler.
- [ ] Menerjemahkan HTML dari `docs/wireframes/` menjadi struktur JSX.
- [ ] Mengaplikasikan *design tokens* (CSS variables) dari `DESIGN.md`.
- [ ] Menambahkan *Grid/Flexbox* responsif untuk memastikan semua komponen (Hero, Navbar, Konten) beradaptasi dengan layar *mobile*.
- [ ] Melakukan uji lintas peramban (*cross-browser*) untuk memastikan Ikon dan Tipografi merender dengan baik.

## Sprint 8: Full Dynamic CMS Integration
**Goal:** Memastikan 100% aspek visual di halaman publik dapat diedit via Dasbor Admin tanpa modifikasi kode.
- [ ] Menghubungkan *Hero Section* dan *Footer* dengan data dari tabel `site_settings`.
- [ ] Membuat sistem manajemen Menu Dinamis dari tabel `menu_items`.
- [ ] Membangun antarmuka Editor (*Rich Text*) di Dasbor Admin untuk mengelola `pages`, `posts`, dan `gallery_items`.
- [ ] Mengimplementasikan *Role-Based Access Control* (RBAC) (misal: *Contributor* hanya bisa menulis *draft*, *Editor* bisa *publish*).

## Sprint 9: Testing & Deployment
**Goal:** Verifikasi mutu aplikasi dan peluncuran ke lingkungan produksi.
- [ ] Melakukan *end-to-end test* (menggunakan Playwright via MCP) pada alur CMS.
- [ ] Membangun (build) NextJS (`frontend`) dan NestJS (`backend`) untuk lingkungan produksi.
- [ ] *Deploy* basis data secara final di platform Neon.
- [ ] *Deploy* aplikasi *frontend* dan *backend* (misal ke platform Vercel, Railway, atau VPS lokal).
