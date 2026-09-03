'use client';
import { useScrollAnimation } from '@/hooks/useIntersectionObserver';

function AnimatedSection({ children, className = '', animation = 'slide-up' }: { children: React.ReactNode, className?: string, animation?: string }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <div ref={ref} className={`${className} animate-on-scroll ${animation} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}

export default function HomePage() {
  return (
    <>
      <header className="hero">
        <div className="hero-overlay"></div>
        <AnimatedSection className="container hero-content" animation="slide-up">
          <h1>SD Islam Terpadu Iqra 2</h1>
          <p>Membentuk Generasi Qur&apos;ani, Cerdas, dan Berakhlak Mulia. Bergabunglah bersama kami untuk pendidikan terbaik.</p>
          <button className="btn-primary">Pelajari Lebih Lanjut</button>
        </AnimatedSection>
      </header>

      {/* 2. School Value */}
      <section className="highlight-boxes container">
        <AnimatedSection animation="slide-up">
          <div className="highlight-card">
            <i className="icon highlight-icon">menu_book</i>
            <h3>Kurikulum Islami</h3>
            <p>Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Qur&apos;an dan As-Sunnah secara komprehensif.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up">
          <div className="highlight-card">
            <i className="icon highlight-icon">apartment</i>
            <h3>Fasilitas Lengkap</h3>
            <p>Ruang kelas nyaman, laboratorium interaktif, perpustakaan memadai, dan area olahraga luas.</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up">
          <div className="highlight-card">
            <i className="icon highlight-icon">school</i>
            <h3>Pengajar Profesional</h3>
            <p>Dididik oleh guru-guru berpengalaman, berdedikasi tinggi, dan kompeten di bidangnya.</p>
          </div>
        </AnimatedSection>
      </section>

      {/* 3. Highlight Tentang Sekolah */}
      <section className="about container">
        <AnimatedSection className="about-text" animation="slide-right">
          <h2>Sekilas Tentang Kami</h2>
          <p>SD Islam Terpadu Iqra 2 hadir untuk menjawab tantangan pendidikan modern yang tidak hanya fokus pada akademis, tetapi juga penanaman karakter Islami yang kuat sejak dini.</p>
          <p>Dengan lingkungan yang asri dan kondusif, kami berkomitmen untuk melahirkan generasi penerus bangsa yang cerdas secara intelektual, emosional, dan spiritual.</p>
          <button className="btn-secondary">Selengkapnya</button>
        </AnimatedSection>
        <AnimatedSection className="about-image" animation="slide-left">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800" alt="Tentang SDIT Iqra 2" />
        </AnimatedSection>
      </section>

      {/* 4. School Stats */}
      <section className="stats-section">
        <div className="container statistics-grid">
          <AnimatedSection animation="slide-up">
            <div className="stat-item">
              <h3>1998</h3>
              <p>Tahun Berdiri</p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="slide-up">
            <div className="stat-item">
              <h3>500+</h3>
              <p>Siswa Aktif</p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="slide-up">
            <div className="stat-item">
              <h3>45</h3>
              <p>Guru &amp; Staf</p>
            </div>
          </AnimatedSection>
          <AnimatedSection animation="slide-up">
            <div className="stat-item">
              <h3>10+</h3>
              <p>Ekstrakurikuler</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 5. Keunggulan */}
      <section className="keunggulan">
        <div className="container">
          <AnimatedSection animation="slide-down" className="text-center">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Keunggulan Kami</span>
            <h2>Mengapa SD IT Iqra 2 Berbeda?</h2>
          </AnimatedSection>
          <div className="keunggulan-grid">
            <AnimatedSection animation="slide-up">
              <div className="keunggulan-card">
                <i className="icon keunggulan-icon">psychology</i>
                <h3>Pendidikan Karakter</h3>
                <p>Fokus pada pembentukan akhlak mulia dan kecerdasan emosional sejak dini.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="keunggulan-card">
                <i className="icon keunggulan-icon">language</i>
                <h3>Bilingual &amp; Global</h3>
                <p>Pengantar bilingual dan kurikulum yang membekali siswa siap bersaing global.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="keunggulan-card">
                <i className="icon keunggulan-icon">emoji_events</i>
                <h3>Lingkungan Prestasi</h3>
                <p>Tradisi juara di berbagai lomba akademik dan non-akademik tingkat nasional.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 6. Program Unggulan */}
      <section className="programs">
        <div className="container">
          <AnimatedSection animation="slide-down">
            <h2>Program Unggulan</h2>
          </AnimatedSection>
          <div className="program-grid">
            <AnimatedSection animation="slide-up">
              <div className="card">
                <i className="icon program-icon">auto_stories</i>
                <h3>Tahfidz</h3>
                <p>Program hafalan Al-Qur&apos;an terstruktur dengan target capaian dan pendampingan khusus.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="card">
                <i className="icon program-icon">science</i>
                <h3>Sains</h3>
                <p>Eksplorasi ilmu pengetahuan alam melalui eksperimen dan metode pembelajaran interaktif.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="card">
                <i className="icon program-icon">sports_soccer</i>
                <h3>Olahraga</h3>
                <p>Pembinaan fisik dan mental melalui berbagai kegiatan olahraga ekstrakurikuler pilihan.</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="card">
                <i className="icon program-icon">palette</i>
                <h3>Kesenian</h3>
                <p>Penyaluran bakat seni dan kreativitas santri dengan tetap memperhatikan batasan syariat.</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 7. Mengapa Memilih Kami */}
      <section className="mengapa-kami">
        <div className="container mengapa-content">
          <AnimatedSection className="mengapa-image" animation="slide-right">
            <img src="https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800" alt="Mengapa Memilih Kami" />
          </AnimatedSection>
          <AnimatedSection className="mengapa-text" animation="slide-left">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Nilai Tambah</span>
            <h2>Mengapa Memilih Kami?</h2>
            <p>Kami menyadari bahwa setiap anak unik dan memiliki potensi besar yang perlu dikembangkan secara holistik.</p>
            <div className="mengapa-list">
              <div className="mengapa-item">
                <div className="icon-wrapper">
                  <i className="icon">verified_user</i>
                </div>
                <div className="mengapa-item-text">
                  <h4>Terakreditasi A</h4>
                  <p>Legalitas formal dan kualitas pendidikan yang telah diakui oleh pemerintah dengan nilai maksimal.</p>
                </div>
              </div>
              <div className="mengapa-item">
                <div className="icon-wrapper">
                  <i className="icon">groups</i>
                </div>
                <div className="mengapa-item-text">
                  <h4>Komunitas Positif</h4>
                  <p>Sinergi antara sekolah, orang tua, dan lingkungan yang mendukung tumbuh kembang anak secara positif.</p>
                </div>
              </div>
              <div className="mengapa-item">
                <div className="icon-wrapper">
                  <i className="icon">eco</i>
                </div>
                <div className="mengapa-item-text">
                  <h4>Lingkungan Asri</h4>
                  <p>Kampus hijau dan bersih, menciptakan suasana belajar yang nyaman dan kondusif untuk siswa.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 8. Fasilitas */}
      <section className="fasilitas">
        <div className="container">
          <AnimatedSection animation="slide-down">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Dukungan Belajar</span>
            <h2>Fasilitas Terbaik</h2>
          </AnimatedSection>
          <div className="fasilitas-grid">
            <AnimatedSection animation="slide-up">
              <div className="fasilitas-card">
                <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600" alt="Masjid Sekolah" />
                <div className="fasilitas-overlay">
                  <h3>Masjid Sekolah</h3>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="fasilitas-card">
                <img src="https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600" alt="Perpustakaan" />
                <div className="fasilitas-overlay">
                  <h3>Perpustakaan Lengkap</h3>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="fasilitas-card">
                <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600" alt="Lab Komputer" />
                <div className="fasilitas-overlay">
                  <h3>Laboratorium IT</h3>
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="fasilitas-card">
                <img src="https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600" alt="Lapangan Olahraga" />
                <div className="fasilitas-overlay">
                  <h3>Area Olahraga Luas</h3>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
