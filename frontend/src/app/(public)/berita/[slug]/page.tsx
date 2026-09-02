export default function SinglePostPage() {
  return (
    <>
      {/* Page Header */}
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

      {/* Main Content */}
      <main className="container">
        <div className="grid-container">
          
          {/* Article Column */}
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

          {/* Sidebar Column */}
          <aside className="sidebar">
            
            {/* Search Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Pencarian</h3>
              <div className="search-box">
                <input type="text" placeholder="Cari berita..." className="search-input" />
                <button className="search-btn"><span className="material-symbols-outlined">search</span></button>
              </div>
            </div>

            {/* Categories Widget */}
            <div className="sidebar-widget">
              <h3 className="widget-title">Kategori</h3>
              <ul className="category-list">
                <li className="category-item"><a href="#">Akademik</a> <span className="category-count">12</span></li>
                <li className="category-item"><a href="#">Prestasi</a> <span className="category-count">8</span></li>
                <li className="category-item"><a href="#">Pengumuman</a> <span className="category-count">15</span></li>
                <li className="category-item"><a href="#">Kegiatan Siswa</a> <span className="category-count">20</span></li>
              </ul>
            </div>

            {/* Related News Widget */}
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

      <style>{`
        :root {
          --color-primary: #454545;
          --color-secondary: #06bfa2;
          --color-tertiary: #0f7f6d;
          --color-neutral: #F7F8F8;
          --color-surface: #FFFFFF;
          --color-on-tertiary: #F7F8F8;
          --color-border: #E3E8E7;
          --radius-sm: 4px;
          --radius-md: 8px;
          --spacing-sm: 8px;
          --spacing-md: 16px;
          --spacing-lg: 24px;
        }

        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: 'Inter', sans-serif;
          color: var(--color-primary);
          background-color: var(--color-neutral);
          line-height: 1.6;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Roboto', sans-serif;
          margin-bottom: var(--spacing-sm);
        }

        a {
          text-decoration: none;
          color: inherit;
        }

        /* Breadcrumb & Main Layout */
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: var(--spacing-lg);
        }
        .breadcrumb {
          margin-bottom: var(--spacing-lg);
          font-size: 14px;
          color: var(--color-primary);
        }
        .breadcrumb a {
          color: var(--color-tertiary);
          font-weight: 500;
        }

        .grid-container {
          display: grid;
          grid-template-columns: 8fr 4fr;
          gap: calc(var(--spacing-lg) * 2);
        }

        /* Main Article */
        .article-main {
          background-color: var(--color-surface);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        .article-cover {
          width: 100%;
          height: 400px;
          background-color: var(--color-border);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          margin-bottom: var(--spacing-lg);
          overflow: hidden;
        }
        .article-meta {
          display: flex;
          gap: var(--spacing-md);
          align-items: center;
          font-size: 14px;
          margin-bottom: var(--spacing-md);
          flex-wrap: wrap;
          color: var(--color-primary);
        }
        .meta-badge {
          background-color: var(--color-secondary);
          color: var(--color-primary);
          padding: 4px var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-weight: 600;
          text-transform: uppercase;
          font-size: 12px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 6px;
        }
        .meta-item .material-symbols-outlined {
          font-size: 18px;
        }
        .article-title {
          font-size: 3rem;
          line-height: 1.2;
          margin-bottom: var(--spacing-lg);
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          color: var(--color-primary);
        }
        .article-body p {
          margin-bottom: var(--spacing-md);
          font-size: 1rem;
        }
        
        /* Drop Cap for the first paragraph */
        .article-body > p:first-of-type::first-letter {
          float: left;
          font-size: 4rem;
          line-height: 0.8;
          font-family: 'Roboto', sans-serif;
          font-weight: 700;
          color: var(--color-tertiary);
          padding-right: var(--spacing-sm);
          padding-top: var(--spacing-sm);
          margin-bottom: -0.2em;
        }

        .article-body h2, .article-body h3 {
          margin-top: calc(var(--spacing-lg) * 1.5);
          margin-bottom: var(--spacing-sm);
          font-family: 'Roboto', sans-serif;
        }
        
        /* Blockquote */
        .article-body blockquote {
          border-left: 4px solid var(--color-secondary);
          margin: calc(var(--spacing-lg) * 1.5) 0;
          font-style: italic;
          color: var(--color-primary);
          background-color: var(--color-neutral);
          padding: var(--spacing-lg);
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          font-size: 1.25rem;
          line-height: 1.6;
        }
        .article-body ul {
          margin-left: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
        }
        .article-body li {
          margin-bottom: var(--spacing-sm);
        }

        /* Sidebar */
        .sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }
        .sidebar-widget {
          background-color: var(--color-surface);
          padding: var(--spacing-lg);
          border-radius: var(--radius-md);
          border: 1px solid var(--color-border);
        }
        .widget-title {
          font-size: 20px;
          margin-bottom: var(--spacing-md);
          border-bottom: 2px solid var(--color-border);
          padding-bottom: var(--spacing-sm);
        }
        
        /* Search Box */
        .search-box {
          display: flex;
          margin-bottom: var(--spacing-sm);
        }
        .search-input {
          flex-grow: 1;
          padding: 10px 14px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm) 0 0 var(--radius-sm);
          outline: none;
          font-family: 'Inter', sans-serif;
          font-size: 14px;
          background-color: var(--color-surface);
          color: var(--color-primary);
        }
        .search-input:focus {
          border-color: var(--color-tertiary);
        }
        .search-btn {
          background-color: var(--color-tertiary);
          color: var(--color-on-tertiary);
          border: none;
          padding: 0 14px;
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          transition: background-color 0.2s;
        }
        .search-btn:hover {
          background-color: var(--color-secondary);
        }

        .related-news-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }
        .related-news-item {
          display: flex;
          gap: var(--spacing-md);
          align-items: flex-start;
        }
        .related-thumb {
          width: 80px;
          height: 60px;
          background-color: var(--color-border);
          border-radius: var(--radius-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          overflow: hidden;
        }
        .related-content {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .related-title {
          font-size: 14px;
          font-weight: 700;
          font-family: 'Roboto', sans-serif;
          line-height: 1.3;
        }
        .related-title:hover {
          color: var(--color-tertiary);
        }
        .related-date {
          font-size: 12px;
          color: #777;
        }
        .category-list {
          list-style: none;
          margin: 0;
          padding: 0;
        }
        .category-item {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-sm) 0;
          border-bottom: 1px solid var(--color-border);
          font-size: 14px;
        }
        .category-item:last-child {
          border-bottom: none;
        }
        .category-item a:hover {
          color: var(--color-tertiary);
          font-weight: 500;
        }
        .category-count {
          background-color: var(--color-neutral);
          padding: 2px 8px;
          border-radius: var(--radius-sm);
          font-size: 12px;
          color: var(--color-primary);
        }

        @media (max-width: 768px) {
          .grid-container {
            grid-template-columns: 1fr;
          }
          .article-cover {
            height: 250px;
          }
        }
      `}</style>
    </>
  );
}
