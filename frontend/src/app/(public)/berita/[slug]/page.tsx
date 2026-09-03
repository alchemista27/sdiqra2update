export default function SinglePostPage() {
  return (
    <>
      <header className="page-header" style={{
        background: "linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=2069&auto=format&fit=crop') center/cover no-repeat",
        padding: "calc(var(--spacing-lg) * 4) var(--spacing-lg)",
        textAlign: "center",
        color: "var(--color-surface)",
        marginBottom: "var(--spacing-lg)"
      }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "var(--spacing-sm)", color: "var(--color-surface)", fontFamily: "'Roboto', sans-serif" }}>Detail Berita</h1>
        <div className="breadcrumb" style={{ fontSize: "14px", opacity: 0.9, fontWeight: 500, color: "var(--color-surface)", margin: 0 }}>
          <a href="#" style={{ color: "var(--color-surface)" }}>Beranda</a> &gt; <a href="#" style={{ color: "var(--color-surface)" }}>Berita</a> &gt; <span>Prestasi Siswa</span>
        </div>
      </header>
      <main className="container">
        <div className="grid-container">
          <article className="article-main">
            <div className="article-cover">
              <span className="material-symbols-outlined" style={{ fontSize: "64px", color: "#ccc" }}>image</span>
            </div>
           
            <div className="article-meta">
              <span className="meta-badge">Prestasi</span>
              <div className="meta-item">
                <span className="material-symbols-outlined">person</span>
                <span>Oleh Admin</span>
              </div>
              <div className="meta-item">
                <span className="material-symbols-outlined">calendar_today</span>
                <span>20 Agustus 2026</span>
              </div>
            </div>

            <h1 className="article-title">Prestasi Siswa SD IT Iqra 2 di Ajang Olimpiade Nasional</h1>
           
            <div className="article-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ultricies odio ut urna euismod, eget ullamcorper justo bibendum. Nulla facilisi. Sed non mi cursus, tempor magna vel, pretium elit. Nullam lacinia eros ut ante convallis, vel interdum nulla facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.</p>
             
              <p>Curabitur venenatis tellus at quam bibendum, at tristique ipsum vehicula. Sed elementum risus quis nisi dictum, vitae tincidunt metus eleifend. Morbi eget erat tincidunt, tincidunt elit ac, fermentum mauris.</p>

              <h2>Persiapan yang Matang</h2>
              <p>Phasellus auctor accumsan massa, ut lobortis nisi hendrerit id. Proin scelerisque urna at ex euismod, a venenatis nisl scelerisque. Aliquam id ex eget velit laoreet finibus vel in libero.</p>

              <blockquote>
                &quot;Keberhasilan ini adalah buah dari kerja keras, disiplin, serta dukungan penuh dari para guru dan orang tua murid. Kami sangat bangga atas pencapaian ini.&quot; - Kepala Sekolah SD IT Iqra 2.
              </blockquote>

              <h3>Faktor-faktor Pendukung</h3>
              <p>Beberapa hal yang menjadi kunci kesuksesan siswa-siswi kita antara lain:</p>
              <ul>
                <li>Program bimbingan belajar khusus olimpiade yang intensif.</li>
                <li>Dukungan dan doa dari seluruh civitas akademika dan orang tua.</li>
                <li>Kesehatan fisik dan mental yang terjaga selama masa persiapan.</li>
                <li>Fasilitas belajar yang memadai di lingkungan sekolah.</li>
              </ul>

              <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam interdum, lorem id consequat auctor, velit felis convallis nibh, eget hendrerit enim justo sed tellus. Quisque congue ligula non accumsan pellentesque.</p>
            </div>
          </article>
          <aside className="sidebar">
            <div className="sidebar-widget">
              <h3 className="widget-title">Pencarian</h3>
              <div className="search-box">
                <input type="text" placeholder="Cari berita..." className="search-input" />
                <button className="search-btn"><span className="material-symbols-outlined">search</span></button>
              </div>
            </div>
            <div className="sidebar-widget">
              <h3 className="widget-title">Kategori</h3>
              <ul className="category-list">
                <li className="category-item"><a href="#">Akademik</a> <span className="category-count">12</span></li>
                <li className="category-item"><a href="#">Prestasi</a> <span className="category-count">8</span></li>
                <li className="category-item"><a href="#">Pengumuman</a> <span className="category-count">15</span></li>
                <li className="category-item"><a href="#">Kegiatan Siswa</a> <span className="category-count">20</span></li>
              </ul>
            </div>
            <div className="sidebar-widget">
              <h3 className="widget-title">Berita Terkait</h3>
              <div className="related-news-list">
                <div className="related-news-item">
                  <div className="related-thumb"><span className="material-symbols-outlined" style={{ color: "#ccc" }}>image</span></div>
                  <div className="related-content">
                    <a href="#" className="related-title">Kegiatan Ekstrakurikuler Memanah SD IT Iqra 2</a>
                    <span className="related-date">18 Agustus 2026</span>
                  </div>
                </div>
                <div className="related-news-item">
                  <div className="related-thumb"><span className="material-symbols-outlined" style={{ color: "#ccc" }}>image</span></div>
                  <div className="related-content">
                    <a href="#" className="related-title">Kunjungan Edukatif ke Museum Negeri Bengkulu</a>
                    <span className="related-date">15 Agustus 2026</span>
                  </div>
                </div>
                <div className="related-news-item">
                  <div className="related-thumb"><span className="material-symbols-outlined" style={{ color: "#ccc" }}>image</span></div>
                  <div className="related-content">
                    <a href="#" className="related-title">Penerimaan Peserta Didik Baru (PPDB) Tahun 2027/2028</a>
                    <span className="related-date">10 Agustus 2026</span>
                  </div>
                </div>
              </div>
            </div>

          </aside>

        </div>
      </main>

     
    </>
  );
}
