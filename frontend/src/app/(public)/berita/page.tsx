import Link from "next/link";

export default function BeritaPage() {
  return (
    <>
      {/* Page Header */}
      <header className="page-header">
        <h1>Berita &amp; Pengumuman</h1>
        <div className="breadcrumb">Beranda / Berita</div>
      </header>

      <main className="container">
        {/* Grid */}
        <div className="news-grid">
          {/* Card 1 */}
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

          {/* Card 2 */}
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

          {/* Card 3 */}
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

          {/* Card 4 */}
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

          {/* Card 5 */}
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

          {/* Card 6 */}
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

        {/* Load More */}
        <div className="load-more-container">
          <button className="btn-load-more">Tampilkan Lebih Banyak</button>
        </div>
      </main>

      <style>{`
        /* Page Header */
        .page-header { background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop') center/cover no-repeat; padding: calc(var(--spacing-lg) * 4) var(--spacing-lg); text-align: center; color: var(--color-surface); }
        .page-header h1 { font-size: 2.5rem; margin-bottom: var(--spacing-sm); color: var(--color-surface); }
        .breadcrumb { font-size: 14px; opacity: 0.9; font-weight: 500; color: var(--color-surface); }

        /* Container */
        .container { max-width: 1200px; margin: 0 auto; padding: calc(var(--spacing-lg) * 2) var(--spacing-lg); }

        /* News Grid */
        .news-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--spacing-lg); margin-bottom: calc(var(--spacing-lg) * 2); }
        .news-card { text-decoration: none; background: var(--color-surface); border: 1px solid var(--color-border); border-radius: var(--radius-md); overflow: hidden; display: flex; flex-direction: column; transition: transform 0.2s ease, box-shadow 0.2s ease; cursor: pointer; }
        .news-card:hover { transform: translateY(-4px); box-shadow: 0 12px 24px rgba(0,0,0,0.05); }
        
        .news-image-wrapper { position: relative; height: 200px; background: var(--color-neutral); border-bottom: 1px solid var(--color-border); display: flex; align-items: center; justify-content: center; color: var(--color-primary); opacity: 0.8; }
        .news-image-wrapper .material-symbols-outlined { font-size: 64px; opacity: 0.3; }
        .news-badge { position: absolute; top: var(--spacing-md); left: var(--spacing-md); background: var(--color-tertiary); color: var(--color-on-tertiary); font-family: 'Inter', sans-serif; font-size: 11px; font-weight: 600; padding: 4px 10px; border-radius: var(--radius-sm); }
        
        .news-content { padding: var(--spacing-lg); display: flex; flex-direction: column; flex: 1; }
        .news-title { font-size: 1.125rem; line-height: 1.4; margin-bottom: var(--spacing-md); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; color: var(--color-primary); font-family: 'Roboto', sans-serif; font-weight: 700; }
        
        .news-meta { display: flex; align-items: center; justify-content: space-between; margin-top: auto; font-family: 'Inter', sans-serif; font-size: 12px; color: var(--color-primary); opacity: 0.7; padding-top: var(--spacing-md); border-top: 1px solid var(--color-border); }
        .meta-item { display: flex; align-items: center; gap: 4px; }
        .meta-item .material-symbols-outlined { font-size: 16px; }

        /* Load More Button */
        .load-more-container { text-align: center; margin-top: calc(var(--spacing-lg) * 2); }
        .btn-load-more { background: transparent; color: var(--color-tertiary); border: 2px solid var(--color-tertiary); padding: 12px 32px; border-radius: var(--radius-sm); font-weight: 600; font-size: 14px; cursor: pointer; transition: all 0.2s; font-family: 'Inter', sans-serif; }
        .btn-load-more:hover { background: var(--color-tertiary); color: var(--color-on-tertiary); }

        @media (max-width: 768px) {
          .news-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
