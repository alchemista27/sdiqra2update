import Link from "next/link";
import { AnimatedSection } from '@/components/AnimatedSection';
import { settingsApi } from '@/lib/api';

export const revalidate = 60; // Revalidate cache every 60s

export default async function TentangSekolahPage() {
  let s: Record<string, string> = {};
  try {
    const res = await settingsApi.getAll();
    s = res.data || {};
  } catch (err) {
    console.warn("Info: Backend offline, using default settings.");
  }

  // Parse JSON settings
  const parseJSON = (key: string, defaultVal: any[]) => {
    try { return JSON.parse(s[key]) || defaultVal; } 
    catch { return defaultVal; }
  };

  const stats = parseJSON('homepage_stats', [
    { value: '1998', label: 'Tahun Berdiri' },
    { value: '500+', label: 'Siswa Aktif' },
    { value: '45', label: 'Guru & Staf' },
    { value: '10+', label: 'Ekstrakurikuler' }
  ]);

  const team = parseJSON('about_team', [
    { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', name: 'Ustadzah Fatimah, S.Pd', role: 'Wakil Kepala Sekolah' },
    { image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', name: 'Ustadz Ahmad, M.Pd', role: 'Koordinator Tahfidz' },
    { image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400', name: 'Ustadzah Aisyah, S.Pd.I', role: 'Guru Kelas' },
    { image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', name: 'Ustadz Umar, S.Kom', role: 'Guru IT' },
  ]);

  // Variables for dynamic content
  const heroBg = s['about_hero_image'] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920';
  const aboutImage = s['about_image'] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=800';
  const statsBg = s['stats_image'] || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920';
  const principalImg = s['about_principal_image'] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600';

  return (
    <>
      {/* 1. Hero Section */}
      <header className="page-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroBg}')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: 'white', textAlign: 'center' }}>
        <AnimatedSection className="container" animation="slide-up">
          <h1 style={{ color: 'white' }}>{s['about_hero_title'] || 'Tentang Sekolah'}</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>{s['about_hero_subtitle'] || 'Berkomitmen mencetak generasi Qur\'ani yang berwawasan global, berakhlak mulia, dan unggul dalam prestasi.'}</p>
        </AnimatedSection>
      </header>

      {/* 2. Highlight Tentang Sekolah (Same as Homepage but with PPDB button) */}
      <section className="about container" style={{ padding: '80px 15px' }}>
        <AnimatedSection className="about-text" animation="slide-right">
          <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Siapa Kami</span>
          <h2>{s['about_title'] || 'Sekilas Tentang Kami'}</h2>
          <p>{s['about_desc1'] || 'SD Islam Terpadu Iqra 2 hadir untuk menjawab tantangan pendidikan modern yang tidak hanya fokus pada akademis, tetapi juga penanaman karakter Islami yang kuat sejak dini.'}</p>
          <p>{s['about_desc2'] || 'Dengan lingkungan yang asri dan kondusif, kami berkomitmen untuk melahirkan generasi penerus bangsa yang cerdas secara intelektual, emosional, dan spiritual.'}</p>
          <Link href="/ppdb" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>Daftar PPDB</Link>
        </AnimatedSection>
        <AnimatedSection className="about-image" animation="slide-left">
          <img src={aboutImage} alt="Tentang SDIT Iqra 2" style={{ borderRadius: '16px', width: '100%' }} />
        </AnimatedSection>
      </section>

      {/* 3. Visi Misi */}
      <section className="visi-misi-section">
        <div className="container">
          <AnimatedSection animation="slide-down" className="text-center">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Tujuan Kami</span>
            <h2>Visi & Misi</h2>
          </AnimatedSection>
          <div className="visi-misi-grid">
            <AnimatedSection animation="slide-up">
              <div className="visi-misi-card">
                <h3><span className="material-symbols-outlined icon">visibility</span> Visi</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{s['about_vision'] || 'Menjadi sekolah dasar unggulan yang melahirkan generasi Qur\'ani, cerdas, kreatif, mandiri, dan berwawasan lingkungan.'}</p>
              </div>
            </AnimatedSection>
            <AnimatedSection animation="slide-up">
              <div className="visi-misi-card">
                <h3><span className="material-symbols-outlined icon">explore</span> Misi</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{s['about_mission'] || '1. Menyelenggarakan pendidikan dasar yang memadukan IMTAQ dan IPTEK.\n2. Membangun lingkungan belajar yang kondusif, aman, dan Islami.\n3. Mengembangkan bakat, minat, dan potensi siswa secara optimal.\n4. Membiasakan pengamalan nilai-nilai ajaran Islam dalam kehidupan sehari-hari.'}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* 4. Stats Sekolah */}
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

      {/* 5. Tim (Guru dan Karyawan) */}
      <section className="team-section">
        <div className="container">
          <AnimatedSection animation="slide-down" className="text-center">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Tenaga Pendidik</span>
            <h2>Tim Guru & Karyawan</h2>
          </AnimatedSection>
          <div className="team-grid">
            {team.map((t: any, i: number) => (
              <AnimatedSection key={i} animation="slide-up">
                <div className="team-card">
                  <img src={t.image} alt={t.name} className="team-card-image" />
                  <h4>{t.name}</h4>
                  <p>{t.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Sambutan Kepala Sekolah */}
      <section className="sambutan-section">
        <div className="container sambutan-content">
          <AnimatedSection className="sambutan-image-wrapper" animation="slide-right">
            <img src={principalImg} alt="Kepala Sekolah" />
          </AnimatedSection>
          <AnimatedSection className="sambutan-text" animation="slide-left">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Sambutan</span>
            <h2>{s['about_principal_name'] || 'H. Ahmad Abdullah, S.Pd., M.Pd.'}</h2>
            <span className="jabatan">Kepala Sekolah SD IT Iqra 2</span>
            <div className="sambutan-quote">
              <p style={{ whiteSpace: 'pre-line' }}>
                {s['about_principal_message'] || '"Assalamu\'alaikum Warahmatullahi Wabarakatuh.\n\nSelamat datang di website resmi SD Islam Terpadu Iqra 2. Kami bangga dapat menjadi mitra bapak/ibu dalam mendidik putra-putri tercinta.\n\nDi SD IT Iqra 2, kami tidak sekadar mentransfer ilmu, tetapi juga mendidik karakter, menanamkan nilai-nilai tauhid, serta mengasah potensi fitrah setiap anak agar menjadi pemimpin masa depan yang berakhlak karimah.\n\nSemoga website ini menjadi jembatan informasi yang bermanfaat bagi kita semua. Terima kasih atas kepercayaan Anda."'}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

    </>
  );
}
