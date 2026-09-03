import Link from "next/link";
import { formatUrl } from "@/lib/urlUtils";
import { AnimatedSection } from '@/components/AnimatedSection';
import { settingsApi } from '@/lib/api';

export const revalidate = 60; // Revalidate cache every 60s

export default async function HomePage() {
  let s: Record<string, string> = {};
  try {
    const res = await settingsApi.getAll();
    s = res.data || {};
  } catch (err) {
    console.warn("Info: Backend offline, using default homepage settings.");
  }

  // Parse JSON settings
  const parseJSON = (key: string, defaultVal: any[]) => {
    try { return JSON.parse(s[key]) || defaultVal; } 
    catch { return defaultVal; }
  };

  const values = parseJSON('homepage_values', [
    { icon: 'menu_book', title: 'Kurikulum Islami', desc: 'Mengintegrasikan kurikulum nasional dengan nilai-nilai Al-Qur\'an dan As-Sunnah secara komprehensif.' },
    { icon: 'apartment', title: 'Fasilitas Lengkap', desc: 'Ruang kelas nyaman, laboratorium interaktif, perpustakaan memadai, dan area olahraga luas.' },
    { icon: 'school', title: 'Pengajar Profesional', desc: 'Dididik oleh guru-guru berpengalaman, berdedikasi tinggi, dan kompeten di bidangnya.' }
  ]);

  const stats = parseJSON('homepage_stats', [
    { value: '1998', label: 'Tahun Berdiri' },
    { value: '500+', label: 'Siswa Aktif' },
    { value: '45', label: 'Guru & Staf' },
    { value: '10+', label: 'Ekstrakurikuler' }
  ]);

  const features = parseJSON('homepage_features', [
    { icon: 'psychology', title: 'Pendidikan Karakter', desc: 'Fokus pada pembentukan akhlak mulia dan kecerdasan emosional sejak dini.' },
    { icon: 'language', title: 'Bilingual & Global', desc: 'Pengantar bilingual dan kurikulum yang membekali siswa siap bersaing global.' },
    { icon: 'emoji_events', title: 'Lingkungan Prestasi', desc: 'Tradisi juara di berbagai lomba akademik dan non-akademik tingkat nasional.' }
  ]);

  const programs = parseJSON('homepage_programs', [
    { icon: 'auto_stories', title: 'Tahfidz', desc: 'Program hafalan Al-Qur\'an terstruktur dengan target capaian dan pendampingan khusus.' },
    { icon: 'science', title: 'Sains', desc: 'Eksplorasi ilmu pengetahuan alam melalui eksperimen dan metode pembelajaran interaktif.' },
    { icon: 'sports_soccer', title: 'Olahraga', desc: 'Pembinaan fisik dan mental melalui berbagai kegiatan olahraga ekstrakurikuler pilihan.' },
    { icon: 'palette', title: 'Kesenian', desc: 'Penyaluran bakat seni dan kreativitas santri dengan tetap memperhatikan batasan syariat.' }
  ]);

  const whyus = parseJSON('homepage_whyus', [
    { icon: 'verified_user', title: 'Terakreditasi A', desc: 'Legalitas formal dan kualitas pendidikan yang telah diakui oleh pemerintah dengan nilai maksimal.' },
    { icon: 'groups', title: 'Komunitas Positif', desc: 'Sinergi antara sekolah, orang tua, dan lingkungan yang mendukung tumbuh kembang anak secara positif.' },
    { icon: 'eco', title: 'Lingkungan Asri', desc: 'Kampus hijau dan bersih, menciptakan suasana belajar yang nyaman dan kondusif untuk siswa.' }
  ]);

  const facilities = parseJSON('homepage_facilities', [
    { image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600', title: 'Masjid Sekolah' },
    { image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=600', title: 'Perpustakaan Lengkap' },
    { image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&q=80&w=600', title: 'Laboratorium IT' },
    { image: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?auto=format&fit=crop&q=80&w=600', title: 'Area Olahraga Luas' }
  ]);

  const heroBg = s['hero_image'] || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920';
  const aboutImage = s['about_image'] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800';
  const whyImage = s['why_image'] || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800';
  const statsBg = s['stats_image'] || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920';

  return (
    <>
      <header className="hero" style={{ backgroundImage: `url('${heroBg}')` }}>
        <div className="hero-overlay"></div>
        <AnimatedSection className="container hero-content" animation="slide-up">
          <h1>{s['hero_title'] || 'SD Islam Terpadu Iqra 2'}</h1>
          <p>{s['hero_subtitle'] || 'Membentuk Generasi Qur\'ani, Cerdas, dan Berakhlak Mulia. Bergabunglah bersama kami untuk pendidikan terbaik.'}</p>
          {s['hero_cta_primary_text'] && <Link href={formatUrl(s['hero_cta_primary_url'])} className="btn-primary">{s['hero_cta_primary_text']}</Link>}
          {s['hero_cta_secondary_text'] && <Link href={formatUrl(s['hero_cta_secondary_url'])} className="btn-secondary" style={{ marginLeft: '10px' }}>{s['hero_cta_secondary_text']}</Link>}
        </AnimatedSection>
      </header>

      {/* 2. School Value */}
      <section className="highlight-boxes container">
        {values.map((v: any, i: number) => (
          <AnimatedSection key={i} animation="slide-up">
            <div className="highlight-card">
              <i className="icon highlight-icon">{v.icon}</i>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          </AnimatedSection>
        ))}
      </section>

      {/* 3. Highlight Tentang Sekolah */}
      <section className="about container">
        <AnimatedSection className="about-text" animation="slide-right">
          <h2>{s['about_title'] || 'Sekilas Tentang Kami'}</h2>
          <p>{s['about_desc1'] || 'SD Islam Terpadu Iqra 2 hadir untuk menjawab tantangan pendidikan modern yang tidak hanya fokus pada akademis, tetapi juga penanaman karakter Islami yang kuat sejak dini.'}</p>
          <p>{s['about_desc2'] || 'Dengan lingkungan yang asri dan kondusif, kami berkomitmen untuk melahirkan generasi penerus bangsa yang cerdas secara intelektual, emosional, dan spiritual.'}</p>
          <Link href={s['about_button_url'] ? formatUrl(s['about_button_url']) : '/tentang-sekolah'} className="btn-secondary">{s['about_button_text'] || 'Selengkapnya'}</Link>
        </AnimatedSection>
        <AnimatedSection className="about-image" animation="slide-left">
          <img src={aboutImage} alt="Tentang SDIT Iqra 2" />
        </AnimatedSection>
      </section>

      {/* 4. School Stats */}
      <section className="stats-section" style={{ backgroundImage: `linear-gradient(rgba(15, 127, 109, 0.9), rgba(15, 127, 109, 0.9)), url('${statsBg}')` }}>
        <div className="container statistics-grid">
          {stats.map((st: any, i: number) => (
            <AnimatedSection key={i} animation="slide-up">
              <div className="stat-item">
                <h3>{st.value}</h3>
                <p>{st.label}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* 5. Keunggulan */}
      <section className="keunggulan">
        <div className="container">
          <AnimatedSection animation="slide-down" className="text-center">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Keunggulan Kami</span>
            <h2>{s['features_title'] || 'Mengapa SD IT Iqra 2 Berbeda?'}</h2>
          </AnimatedSection>
          <div className="keunggulan-grid">
            {features.map((f: any, i: number) => (
              <AnimatedSection key={i} animation="slide-up">
                <div className="keunggulan-card">
                  <i className="icon keunggulan-icon">{f.icon}</i>
                  <h3>{f.title}</h3>
                  <p>{f.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Program Unggulan */}
      <section className="programs">
        <div className="container">
          <AnimatedSection animation="slide-down">
            <h2>{s['programs_title'] || 'Program Unggulan'}</h2>
          </AnimatedSection>
          <div className="program-grid">
            {programs.map((p: any, i: number) => (
              <AnimatedSection key={i} animation="slide-up">
                <div className="card">
                  <i className="icon program-icon">{p.icon}</i>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Mengapa Memilih Kami */}
      <section className="mengapa-kami">
        <div className="container mengapa-content">
          <AnimatedSection className="mengapa-image" animation="slide-right">
            <img src={whyImage} alt="Mengapa Memilih Kami" />
          </AnimatedSection>
          <AnimatedSection className="mengapa-text" animation="slide-left">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Nilai Tambah</span>
            <h2>{s['why_title'] || 'Mengapa Memilih Kami?'}</h2>
            <p>{s['why_desc'] || 'Kami menyadari bahwa setiap anak unik dan memiliki potensi besar yang perlu dikembangkan secara holistik.'}</p>
            <div className="mengapa-list">
              {whyus.map((w: any, i: number) => (
                <div key={i} className="mengapa-item">
                  <div className="icon-wrapper">
                    <i className="icon">{w.icon}</i>
                  </div>
                  <div className="mengapa-item-text">
                    <h4>{w.title}</h4>
                    <p>{w.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* 8. Fasilitas */}
      <section className="fasilitas">
        <div className="container">
          <AnimatedSection animation="slide-down">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Dukungan Belajar</span>
            <h2>{s['facilities_title'] || 'Fasilitas Terbaik'}</h2>
          </AnimatedSection>
          <div className="fasilitas-grid">
            {facilities.map((f: any, i: number) => (
              <AnimatedSection key={i} animation="slide-up">
                <div className="fasilitas-card">
                  <img src={f.image} alt={f.title} />
                  <div className="fasilitas-overlay">
                    <h3>{f.title}</h3>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
