import Link from "next/link";
import { AnimatedSection } from '@/components/AnimatedSection';
import { settingsApi } from '@/lib/api';

export const dynamic = 'force-dynamic'; // Revalidate cache every 60s

export default async function SambutanKepalaSekolahPage() {
  let s: Record<string, string> = {};
  try {
    const res = await settingsApi.getAll();
    s = res.data || {};
  } catch (err) {
    console.warn("Info: Backend offline, using default settings.");
  }

  const parseJSON = (key: string, defaultVal: any[]) => {
    try { return JSON.parse(s[key]) || defaultVal; } 
    catch { return defaultVal; }
  };

  const team = parseJSON('about_team', [
    { image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400', name: 'Ustadzah Fatimah, S.Pd', role: 'Wakil Kepala Sekolah' },
    { image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=400', name: 'Ustadz Ahmad, M.Pd', role: 'Koordinator Tahfidz' },
    { image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400', name: 'Ustadzah Aisyah, S.Pd.I', role: 'Guru Kelas' },
    { image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=400', name: 'Ustadz Umar, S.Kom', role: 'Guru IT' },
  ]);

  const heroBg = s['sambutan_hero_image'] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1920';
  const principalImg = s['about_principal_image'] || 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600';
  const ctaBg = s['sambutan_cta_image'] || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=1920';

  return (
    <>
      {/* 1. Hero Section */}
      <header className="page-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroBg}')`, backgroundSize: 'cover', backgroundPosition: 'center', padding: '100px 0', color: 'white', textAlign: 'center' }}>
        <AnimatedSection className="container" animation="slide-up">
          <h1 style={{ color: 'white' }}>Sambutan Kepala Sekolah</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Mengenal lebih dekat visi, misi, dan pimpinan SD Islam Terpadu Iqra 2 Kota Bengkulu.</p>
        </AnimatedSection>
      </header>

      {/* 2. Sambutan Kepala Sekolah */}
      <section className="sambutan-section" style={{ padding: '80px 0' }}>
        <div className="container sambutan-content">
          <AnimatedSection className="sambutan-image-wrapper" animation="slide-right">
            <img src={principalImg} alt="Kepala Sekolah" />
          </AnimatedSection>
          <AnimatedSection className="sambutan-text" animation="slide-left">
            <span className="label-caps" style={{color: 'var(--color-secondary)'}}>Pimpinan Kami</span>
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

      {/* 3. Tim (Guru dan Karyawan) */}
      <section className="team-section" style={{ backgroundColor: 'var(--color-neutral)', padding: '80px 0' }}>
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

      {/* 4. Wide Image CTA */}
      <section className="cta-wide-section" style={{ backgroundImage: `url('${ctaBg}')` }}>
        <AnimatedSection className="cta-wide-content" animation="slide-up">
          <h2>Kenali Kami Lebih Dekat</h2>
          <p>Pelajari sejarah, visi misi, serta fasilitas lengkap yang kami sediakan untuk mendukung tumbuh kembang putra-putri Anda.</p>
          <Link href="/tentang-sekolah" className="btn-primary" style={{ marginTop: '20px', display: 'inline-block' }}>
            Telusuri Tentang Kami
          </Link>
        </AnimatedSection>
      </section>
    </>
  );
}
