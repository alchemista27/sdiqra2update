export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>SD Islam Terpadu Iqra 2</h1>
          <p>Membentuk Generasi Qur&apos;ani, Cerdas, dan Berakhlak Mulia. Bergabunglah bersama kami untuk pendidikan terbaik.</p>
          <button className="btn-primary">Pelajari Lebih Lanjut</button>
        </div>
      </header>

      {/* Highlight Boxes */}
      <section className="highlight-boxes container">
        <div className="card highlight-card">
          <i className="icon highlight-icon">menu_book</i>
          <h3>Kurikulum Islami</h3>
          <p>Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Qur&apos;an dan As-Sunnah secara komprehensif.</p>
        </div>
        <div className="card highlight-card">
          <i className="icon highlight-icon">apartment</i>
          <h3>Fasilitas Lengkap</h3>
          <p>Ruang kelas nyaman, laboratorium interaktif, perpustakaan memadai, dan area olahraga luas.</p>
        </div>
        <div className="card highlight-card">
          <i className="icon highlight-icon">school</i>
          <h3>Pengajar Profesional</h3>
          <p>Dididik oleh guru-guru berpengalaman, berdedikasi tinggi, dan kompeten di bidangnya.</p>
        </div>
      </section>

      {/* Sekilas Info / About */}
      <section className="about container">
        <div className="about-text">
          <h2>Sekilas Tentang Kami</h2>
          <p>SD Islam Terpadu Iqra 2 hadir untuk menjawab tantangan pendidikan modern yang tidak hanya fokus pada akademis, tetapi juga penanaman karakter Islami yang kuat sejak dini.</p>
          <p>Dengan lingkungan yang asri dan kondusif, kami berkomitmen untuk melahirkan generasi penerus bangsa yang cerdas secara intelektual, emosional, dan spiritual.</p>
          <button className="btn-secondary">Discover more</button>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" alt="Tentang SDIT Iqra 2" />
        </div>
      </section>

      {/* Program / Fakultas */}
      <section className="programs">
        <div className="container">
          <h2>Program Unggulan</h2>
          <div className="program-grid">
            <div className="card">
              <i className="icon program-icon">auto_stories</i>
              <h3>Tahfidz</h3>
              <p>Program hafalan Al-Qur&apos;an terstruktur dengan target capaian dan pendampingan khusus.</p>
            </div>
            <div className="card">
              <i className="icon program-icon">science</i>
              <h3>Sains</h3>
              <p>Eksplorasi ilmu pengetahuan alam melalui eksperimen dan metode pembelajaran interaktif.</p>
            </div>
            <div className="card">
              <i className="icon program-icon">sports_soccer</i>
              <h3>Olahraga</h3>
              <p>Pembinaan fisik dan mental melalui berbagai kegiatan olahraga ekstrakurikuler pilihan.</p>
            </div>
            <div className="card">
              <i className="icon program-icon">palette</i>
              <h3>Kesenian</h3>
              <p>Penyaluran bakat seni dan kreativitas santri dengan tetap memperhatikan batasan syariat.</p>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        :root {
          --color-primary: #454545;
          --color-secondary: #06bfa2;
          --color-tertiary: #0f7f6d;
          --color-neutral: #F7F8F8;
          --color-surface: #FFFFFF;
          --color-on-tertiary: #F7F8F8;
          --color-border: #E3E8E7;

          --font-h1: 'Roboto', sans-serif;
          --font-body: 'Inter', sans-serif;

          --spacing-sm: 8px;
          --spacing-md: 16px;
          --spacing-lg: 24px;

          --rounded-sm: 4px;
          --rounded-md: 8px;
        }

        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        body {
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 400;
          color: var(--color-primary);
          background-color: var(--color-neutral);
          line-height: 1.6;
        }

        h1, h2, h3 {
          font-family: var(--font-h1);
          font-weight: 700;
          color: var(--color-primary);
        }

        h1 {
          font-size: 3rem;
        }

        h2 {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-lg);
        }

        h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-sm);
        }

        .label-caps {
          font-family: var(--font-body);
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }
        
        .icon {
          font-family: 'Material Icons';
          font-weight: normal;
          font-style: normal;
          font-size: 24px;
          line-height: 1;
          letter-spacing: normal;
          text-transform: none;
          display: inline-block;
          white-space: nowrap;
          word-wrap: normal;
          direction: ltr;
          font-feature-settings: 'liga';
          vertical-align: middle;
        }

        /* Buttons */
        .btn-primary {
          background-color: var(--color-tertiary);
          color: var(--color-on-tertiary);
          border: none;
          border-radius: var(--rounded-sm);
          padding: 12px 20px;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .btn-secondary {
          background-color: transparent;
          color: var(--color-tertiary);
          border: 1px solid var(--color-tertiary);
          border-radius: var(--rounded-sm);
          padding: 12px 20px;
          font-family: var(--font-body);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .btn-secondary:hover {
          background-color: var(--color-tertiary);
          color: var(--color-on-tertiary);
        }

        /* Card */
        .card {
          background-color: var(--color-surface);
          color: var(--color-primary);
          border-radius: var(--rounded-md);
          padding: 20px;
          border: 1px solid var(--color-border);
        }

        /* Hero Section */
        .hero {
          position: relative;
          background-image: url('https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920');
          background-size: cover;
          background-position: center;
          color: var(--color-surface);
          padding: 120px 0 160px;
          text-align: center;
        }

        .hero-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          background-color: rgba(69, 69, 69, 0.7);
        }

        .hero-content {
          position: relative;
          z-index: 1;
          max-width: 800px;
          margin: 0 auto;
        }

        .hero h1 {
          color: var(--color-surface);
          margin-bottom: var(--spacing-md);
        }

        .hero p {
          font-size: 1.25rem;
          margin-bottom: var(--spacing-lg);
          color: var(--color-neutral);
        }

        /* Highlight Boxes */
        .highlight-boxes {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }

        .highlight-card {
          box-shadow: 0 4px 6px rgba(0,0,0,0.05);
          background-color: var(--color-surface);
        }
        
        .highlight-icon {
          color: var(--color-secondary);
          font-size: 32px;
          margin-bottom: var(--spacing-sm);
        }

        /* About Section */
        .about {
          display: flex;
          align-items: center;
          gap: 40px;
          padding: 80px var(--spacing-lg);
          flex-wrap: wrap;
        }

        .about-text {
          flex: 1;
          min-width: 300px;
        }

        .about-text p {
          margin-bottom: var(--spacing-lg);
          color: var(--color-primary);
        }

        .about-image {
          flex: 1;
          min-width: 300px;
        }

        .about-image img {
          width: 100%;
          border-radius: var(--rounded-md);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          display: block;
        }

        /* Programs Section */
        .programs {
          padding: 60px var(--spacing-lg);
          text-align: center;
          background-color: var(--color-surface);
          border-top: 1px solid var(--color-border);
        }

        .program-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-top: var(--spacing-lg);
          text-align: left;
        }
        
        .program-grid .card {
          box-shadow: none;
        }
        
        .program-icon {
          color: var(--color-tertiary);
          font-size: 32px;
          margin-bottom: var(--spacing-sm);
        }
      `}</style>
    </>
  );
}
