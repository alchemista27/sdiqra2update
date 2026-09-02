# Database Schema (Sim Alfida - Website & CMS)

Dokumen ini mendeskripsikan skema basis data PostgreSQL yang telah disesuaikan (dirampingkan) khusus untuk kebutuhan proyek **Website Profil & CMS SDIT Iqra 2**. Modul-modul sistem lama seperti **PPDB**, **Akademik**, dan **Absensi** tidak disertakan dalam ruang lingkup (*scope*) proyek ini.

## Daftar Tabel Inti

### 1. `users`
Menyimpan data kredensial dan hak akses administrator (Super Admin, Humas, dll).
- `id` *(text, PK)*
- `name` *(text)*
- `email` *(text, UNIQUE)*
- `password` *(text)*
- `role` *(enum: USER-DEFINED)*
- `isActive` *(boolean)*
- `passwordChangedAt` *(timestamp, nullable)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 2. `posts`
Menyimpan artikel, pengumuman, dan berita. Berelasi dengan *User* (sebagai penulis) dan *Category*.
- `id` *(text, PK)*
- `title` *(text)*
- `slug` *(text, UNIQUE)*
- `excerpt` *(text, nullable)*
- `content` *(text)*
- `coverImage` *(text, nullable)*
- `status` *(enum: USER-DEFINED - misal: PUBLISHED, DRAFT)*
- `publishedAt` *(timestamp, nullable)*
- `authorId` *(text, FK ke users.id)*
- `categoryId` *(text, nullable, FK ke categories.id)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 3. `categories`
Menyimpan data kategori untuk mengelompokkan artikel/berita.
- `id` *(text, PK)*
- `name` *(text)*
- `slug` *(text, UNIQUE)*
- `description` *(text, nullable)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 4. `pages`
Menyimpan halaman statis (seperti Profil, Visi Misi, Fasilitas).
- `id` *(text, PK)*
- `title` *(text)*
- `slug` *(text, UNIQUE)*
- `content` *(text)*
- `status` *(enum: USER-DEFINED)*
- `sortOrder` *(integer)*
- `authorId` *(text, FK ke users.id)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 5. `media`
Menyimpan *metadata* perpustakaan file (gambar/dokumen) yang diunggah, terhubung dengan Cloudinary.
- `id` *(text, PK)*
- `filename` *(text)*
- `originalName` *(text)*
- `path` *(text)*
- `url` *(text)*
- `mimeType` *(text)*
- `size` *(integer)*
- `uploadedById` *(text, FK ke users.id)*
- `cloudinaryId` *(text, nullable)*
- `cloudinaryUrl` *(text, nullable)*
- `createdAt` *(timestamp)*

### 6. `gallery_items`
Menyimpan data pameran foto (Galeri) yang ditampilkan ke publik.
- `id` *(text, PK)*
- `title` *(text)*
- `description` *(text, nullable)*
- `imageUrl` *(text)*
- `cloudinaryId` *(text, nullable)*
- `order` *(integer)*
- `isActive` *(boolean)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 7. `menu_items`
Mengatur tautan dan hierarki navigasi (*Navbar* / *Footer*) secara dinamis dari panel admin.
- `id` *(text, PK)*
- `label` *(text)*
- `url` *(text)*
- `order` *(integer)*
- `isActive` *(boolean)*
- `openInNewTab` *(boolean)*
- `parentId` *(text, nullable, FK ke menu_items.id untuk submenu)*
- `createdAt` *(timestamp)*
- `updatedAt` *(timestamp)*

### 8. `site_settings`
Menyimpan pengaturan global situs (seperti Nama Situs, Logo, URL Instagram) menggunakan pola *Key-Value*.
- `id` *(text, PK)*
- `key` *(text, UNIQUE)*
- `value` *(text)*
- `updatedAt` *(timestamp)*

## Pemetaan Relasi (Entity-Relationship)
- **1-to-Many (`users` -> `posts`)**: Satu admin bisa menulis banyak artikel.
- **1-to-Many (`users` -> `pages`)**: Satu admin bisa membuat/mengedit banyak halaman statis.
- **1-to-Many (`users` -> `media`)**: Satu admin bisa mengunggah banyak file media.
- **1-to-Many (`categories` -> `posts`)**: Satu kategori bisa mencakup banyak artikel.
- **1-to-Many (`menu_items` -> `menu_items`)**: *Self-referencing* untuk menghasilkan *dropdown/submenu*.

---
*Diekstrak dan divalidasi langsung menggunakan integrasi MCP dari live database (Neon PostgreSQL).*
