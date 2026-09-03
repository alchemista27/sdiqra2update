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

     
    </>
  );
}
