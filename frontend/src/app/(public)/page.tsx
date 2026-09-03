export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero-overlay"></div>
        <div className="container hero-content">
          <h1>SD Islam Terpadu Iqra 2</h1>
          <p>Membentuk Generasi Qur&apos;ani, Cerdas, dan Berakhlak Mulia. Bergabunglah bersama kami untuk pendidikan terbaik.</p>
          <button className="btn-primary">Pelajari Lebih Lanjut</button>
        </div>
      </header>
      <section className="highlight-boxes container -mt-10 md:-mt-20 mb-16 md:mb-24 relative z-10">
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
      <section className="about container py-16 md:py-24 mb-16">
        <div className="about-text">
          <h2>Sekilas Tentang Kami</h2>
          <p>SD Islam Terpadu Iqra 2 hadir untuk menjawab tantangan pendidikan modern yang tidak hanya fokus pada akademis, tetapi juga penanaman karakter Islami yang kuat sejak dini.</p>
          <p>Dengan lingkungan yang asri dan kondusif, kami berkomitmen untuk melahirkan generasi penerus bangsa yang cerdas secara intelektual, emosional, dan spiritual.</p>
          <button className="btn-secondary">Selengkapnya</button>
        </div>
        <div className="about-image">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" alt="Tentang SDIT Iqra 2" />
        </div>
      </section>
      <section className="programs py-16 md:py-24 mt-8">
        <div className="container">
          <h2>Program Unggulan</h2>
          <div className="program-grid mt-10">
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

     
    </>
  );
}
