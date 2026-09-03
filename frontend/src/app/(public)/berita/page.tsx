import Link from "next/link";

export default function BeritaPage() {
  return (
    <>
      <header className="page-header">
        <h1>Berita &amp; Pengumuman</h1>
        <div className="breadcrumb">Beranda / Berita</div>
      </header>

      <main className="container">
        <div className="news-grid">
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Prestasi</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Siswa SD IT Iqra 2 Raih Juara 1 OSN Tingkat Provinsi</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 12 Ags 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Admin</span>
              </div>
            </div>
          </Link>
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Kegiatan</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Peringatan Maulid Nabi Muhammad SAW Tahun 1448 H</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 5 Ags 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Humas</span>
              </div>
            </div>
          </Link>
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Pengumuman</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Jadwal UAS Semester Ganjil TA 2026/2027</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 28 Jul 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Akademik</span>
              </div>
            </div>
          </Link>
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Kegiatan</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Kunjungan Edukatif ke Museum Negeri Bengkulu</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 20 Jul 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Admin</span>
              </div>
            </div>
          </Link>
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Prestasi</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Tim Robotik Meraih Medali Emas di Kompetisi Nasional</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 15 Jul 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Admin</span>
              </div>
            </div>
          </Link>
          <Link href="#" className="news-card">
            <div className="news-image-wrapper">
              <span className="material-symbols-outlined">image</span>
              <span className="news-badge">Pengumuman</span>
            </div>
            <div className="news-content">
              <h2 className="news-title">Pendaftaran Ekskul Semester Genap Tahun 2027</h2>
              <div className="news-meta">
                <span className="meta-item"><span className="material-symbols-outlined">calendar_today</span> 10 Jul 2026</span>
                <span className="meta-item"><span className="material-symbols-outlined">person</span> Kesiswaan</span>
              </div>
            </div>
          </Link>
        </div>
        <div className="load-more-container">
          <button className="btn-load-more">Tampilkan Lebih Banyak</button>
        </div>
      </main>

     
    </>
  );
}
