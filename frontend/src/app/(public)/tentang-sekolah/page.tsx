export default function TentangSekolahPage() {
  return (
    <>
      <header className="page-header">
        <div className="container">
          <h1>Tentang Sekolah</h1>
          <p>Berkomitmen mencetak generasi Qur'ani yang berwawasan global, berakhlak mulia, dan unggul dalam prestasi.</p>
          <div className="breadcrumb">
            <a href="#">Beranda</a> &gt; <span>Tentang Sekolah</span>
          </div>
        </div>
      </header>

      <section className="grid-intro">
        <div className="container">
          <div className="grid-cards">
            <div className="intro-card">
              <span className="material-symbols-outlined">menu_book</span>
              <h3>Belajar di SD IT Iqra 2</h3>
              <p>Memadukan kurikulum nasional dan nilai-nilai Islam dalam pembelajaran.</p>
            </div>
            <div className="intro-card">
              <span className="material-symbols-outlined">diversity_3</span>
              <h3>Kehidupan Sekolah</h3>
              <p>Lingkungan belajar yang ramah, aman, dan mendukung perkembangan anak.</p>
            </div>
            <div className="intro-card">
              <span className="material-symbols-outlined">workspace_premium</span>
              <h3>Keunggulan Akademik</h3>
              <p>Menghasilkan lulusan berprestasi di berbagai kompetisi lokal dan nasional.</p>
            </div>
            <div className="intro-card">
              <span className="material-symbols-outlined">sports_basketball</span>
              <h3>Program & Ekstrakurikuler</h3>
              <p>Pengembangan minat dan bakat melalui berbagai kegiatan positif yang terarah.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="who-we-are">
        <div className="container who-we-are-content">
          <div className="who-we-are-text">
            <span className="section-label">Siapa Kami</span>
            <h2>Sejarah dan Perjalanan SD IT Iqra 2</h2>
            <p>SD Islam Terpadu Iqra 2 Kota Bengkulu didirikan sebagai respons atas tingginya harapan masyarakat terhadap pendidikan dasar yang tidak hanya mengedepankan aspek kognitif, tetapi juga pembentukan karakter Islami anak-anak mereka. Di bawah naungan Yayasan Alfida, sekolah ini mulai merintis langkahnya untuk menjadi lembaga pendidikan yang terpercaya.</p>
            <p>Dengan pengalaman lebih dari satu dekade, Yayasan Alfida terus berinovasi dan mengembangkan fasilitas serta kurikulum yang adaptif terhadap perkembangan zaman tanpa meninggalkan akar tradisi Islam.</p>
            
            <ul>
              <li>
                <span className="material-symbols-outlined">check_circle</span>
                <span>Berbasis nilai-nilai Al-Qur'an dan As-Sunnah.</span>
              </li>
              <li>
                <span className="material-symbols-outlined">check_circle</span>
                <span>Fasilitas pembelajaran modern dan lengkap.</span>
              </li>
              <li>
                <span className="material-symbols-outlined">check_circle</span>
                <span>Tenaga pendidik profesional dan berpengalaman.</span>
              </li>
            </ul>

            <a href="#" className="navbar-btn" style={{ display: 'inline-block', marginTop: '16px' }}>Visi & Misi Kami</a>
          </div>
          <div className="who-we-are-image">
            <span className="material-symbols-outlined">school</span>
          </div>
        </div>
      </section>

      <section className="statistics">
        <div className="container statistics-grid">
          <div className="stat-item">
            <h3>1998</h3>
            <p>Tahun Berdiri</p>
          </div>
          <div className="stat-item">
            <h3>500+</h3>
            <p>Siswa Aktif</p>
          </div>
          <div className="stat-item">
            <h3>45</h3>
            <p>Guru & Staf</p>
          </div>
          <div className="stat-item">
            <h3>10+</h3>
            <p>Ekstrakurikuler</p>
          </div>
        </div>
      </section>

      <style>{`
        /* Page Header */
        .page-header {
            background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
            padding: var(--spacing-2xl) 0 calc(var(--spacing-2xl) + 80px) 0;
            text-align: center;
            color: var(--color-surface);
        }
        .page-header h1 {
            font-size: 48px;
            margin-bottom: var(--spacing-md);
            color: var(--color-surface);
        }
        .page-header p {
            color: var(--color-surface);
            opacity: 0.9;
            max-width: 700px;
            margin: 0 auto;
        }
        .breadcrumb {
            margin-top: var(--spacing-lg);
            font-size: 14px;
            color: var(--color-primary);
            opacity: 0.7;
        }
        .breadcrumb a {
            color: var(--color-tertiary);
            text-decoration: none;
        }

        /* Grid Intro */
        .grid-intro {
            padding: 0 0 var(--spacing-xl) 0;
        }
        .grid-cards {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--spacing-lg);
            margin-top: -80px;
            position: relative;
            z-index: 10;
        }
        .intro-card {
            background-color: var(--color-surface);
            border: 1px solid var(--color-border);
            border-radius: var(--radius-md);
            padding: var(--spacing-xl) var(--spacing-lg);
            text-align: center;
            transition: transform 0.2s, box-shadow 0.2s;
            box-shadow: 0 4px 12px rgba(0,0,0,0.03);
        }
        .intro-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.06);
        }
        .intro-card .material-symbols-outlined {
            font-size: 48px;
            color: var(--color-secondary);
            margin-bottom: var(--spacing-md);
        }
        .intro-card h3 {
            font-size: 20px;
            margin-bottom: var(--spacing-sm);
            color: var(--color-primary);
        }
        .intro-card p {
            font-size: 14px;
            opacity: 0.8;
        }

        /* Who We Are */
        .who-we-are {
            padding: var(--spacing-xl) 0 var(--spacing-2xl);
        }
        .who-we-are-content {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: var(--spacing-2xl);
            align-items: center;
        }
        .section-label {
            color: var(--color-secondary);
            font-weight: 600;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 1px;
            margin-bottom: var(--spacing-sm);
            display: block;
        }
        .who-we-are-text h2 {
            font-size: 36px;
            margin-bottom: var(--spacing-lg);
            color: var(--color-primary);
        }
        .who-we-are-text p {
            margin-bottom: var(--spacing-md);
            font-size: 16px;
            color: var(--color-primary);
            opacity: 0.9;
        }
        .who-we-are-text ul {
            list-style: none;
            margin-top: var(--spacing-lg);
            margin-bottom: var(--spacing-lg);
        }
        .who-we-are-text li {
            display: flex;
            align-items: flex-start;
            gap: var(--spacing-sm);
            margin-bottom: var(--spacing-md);
            font-weight: 500;
        }
        .who-we-are-text li .material-symbols-outlined {
            color: var(--color-secondary);
        }
        .who-we-are-image {
            background-color: var(--color-neutral);
            border-radius: var(--radius-md);
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid var(--color-border);
            position: relative;
            overflow: hidden;
        }
        .who-we-are-image .material-symbols-outlined {
            font-size: 100px;
            color: var(--color-tertiary);
            opacity: 0.2;
        }

        /* Statistics Counter */
        .statistics {
            background-color: var(--color-neutral);
            border-top: 1px solid var(--color-border);
            border-bottom: 1px solid var(--color-border);
            padding: var(--spacing-2xl) 0;
        }
        .statistics-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: var(--spacing-lg);
            text-align: center;
        }
        .stat-item h3 {
            font-size: 56px;
            margin-bottom: var(--spacing-sm);
            font-weight: 900;
            color: var(--color-tertiary);
        }
        .stat-item p {
            font-size: 14px;
            text-transform: uppercase;
            letter-spacing: 1.5px;
            font-weight: 600;
            color: var(--color-primary);
        }

        /* Responsive */
        @media (max-width: 992px) {
            .page-header {
                padding-bottom: calc(var(--spacing-2xl) + 20px);
            }
            .grid-cards {
                grid-template-columns: repeat(2, 1fr);
                margin-top: -40px;
            }
            .who-we-are-content {
                grid-template-columns: 1fr;
            }
            .who-we-are-image {
                order: -1;
                height: 400px;
            }
            .statistics-grid {
                grid-template-columns: repeat(2, 1fr);
                gap: var(--spacing-xl);
            }
        }

        @media (max-width: 768px) {
            .page-header {
                padding-bottom: var(--spacing-2xl);
            }
            .grid-cards {
                grid-template-columns: 1fr;
                margin-top: var(--spacing-lg);
            }
            .statistics-grid {
                grid-template-columns: 1fr;
            }
        }
      `}</style>
    </>
  );
}
