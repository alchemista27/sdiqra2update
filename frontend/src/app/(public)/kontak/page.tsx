import { AnimatedSection } from '@/components/AnimatedSection';
import { settingsApi } from '@/lib/api';
import Link from 'next/link';

export const revalidate = 60;

export default async function KontakPage() {
  let s: Record<string, string> = {};
  try {
    const res = await settingsApi.getAll();
    s = res.data || {};
  } catch (err) {
    console.warn("Info: Backend offline, using default settings.");
  }

  const heroBg = s['contact_hero_image'] || 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920';
  const sideImage = s['contact_side_image'] || 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=800';
  const whatsappNumber = s['whatsapp_number'] || '628123456789';
  const email = s['contact_email'] || 'info@iqra2.sch.id';
  const phone = s['contact_phone'] || '(0736) 123456';
  const address = s['contact_address'] || 'Bengkulu';
  const officeHours = s['contact_office_hours'] || 'Senin - Sabtu: 07.15 - 15.00 WIB';
  const mapsEmbed = s['contact_maps_embed'] || '';

  return (
    <>
      <header className="page-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${heroBg}')` }}>
        <AnimatedSection className="container" animation="slide-up">
          <h1 style={{ color: 'white' }}>Kontak Kami</h1>
          <p style={{ maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>Mari terhubung! Kami siap melayani pertanyaan Anda seputar SD Islam Terpadu Iqra 2.</p>
        </AnimatedSection>
      </header>

      {/* Contact Grid (4 Cards) */}
      <section className="contact-grid">
        <AnimatedSection animation="slide-up" className="h-full">
          <div className="contact-card">
            <div className="contact-icon"><span className="material-symbols-outlined">location_on</span></div>
            <h3>Alamat Lokasi</h3>
            <p style={{ whiteSpace: 'pre-line' }}>{address}</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up" className="h-full">
          <div className="contact-card">
            <div className="contact-icon"><span className="material-symbols-outlined">call</span></div>
            <h3>Telepon & WA</h3>
            <p>{phone}<br />+{whatsappNumber} (WA)</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up" className="h-full">
          <div className="contact-card">
            <div className="contact-icon"><span className="material-symbols-outlined">mail</span></div>
            <h3>Email Resmi</h3>
            <p>{email}</p>
          </div>
        </AnimatedSection>
        <AnimatedSection animation="slide-up" className="h-full">
          <div className="contact-card">
            <div className="contact-icon"><span className="material-symbols-outlined">schedule</span></div>
            <h3>Jam Kantor</h3>
            <p>{officeHours}</p>
          </div>
        </AnimatedSection>
      </section>

      {/* Main Section: Text + Form & Image */}
      <section style={{ padding: '40px 0 20px 0' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <AnimatedSection animation="slide-up" className="h-full">
            <span className="label-caps" style={{ color: 'var(--color-secondary)' }}>Hubungi Kami</span>
            <h2>Mari Terhubung Bersama Kami</h2>
            <p style={{ maxWidth: '700px', margin: '0 auto' }}>
              Jika Anda memiliki pertanyaan seputar informasi pendaftaran, program unggulan sekolah, atau hal lainnya, silakan isi formulir di bawah ini.
            </p>
          </AnimatedSection>
        </div>

        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem', alignItems: 'stretch' }}>
          <AnimatedSection animation="slide-right" className="contact-side-image">
            <div style={{ borderRadius: '12px', overflow: 'hidden', height: '100%', minHeight: '400px', backgroundImage: `url('${sideImage}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}></div>
          </AnimatedSection>

          <AnimatedSection animation="slide-left">
            <div className="form-card" style={{ boxShadow: 'none', border: '1px solid var(--color-border)', borderRadius: '12px', padding: '2rem', height: '100%' }}>
              <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Tinggalkan Pesan</h3>
              <form id="waForm">
                <div className="form-group">
                  <label htmlFor="nama">Nama Lengkap</label>
                  <input type="text" id="nama" required className="input-field" placeholder="Masukkan nama lengkap Anda" />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Opsional</label>
                  <input type="email" id="email" className="input-field" placeholder="Masukkan alamat email Anda" />
                </div>
                <div className="form-group">
                  <label htmlFor="subjek">Subjek</label>
                  <input type="text" id="subjek" required className="input-field" placeholder="Topik pertanyaan" />
                </div>
                <div className="form-group">
                  <label htmlFor="pesan">Pesan</label>
                  <textarea id="pesan" required className="input-field" rows={5} placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <button type="submit" className="btn-primary" style={{ width: '100%', padding: '14px' }}>
                  <span className="material-symbols-outlined">send</span> Kirim Pesan
                </button>
              </form>
              <script
                dangerouslySetInnerHTML={{
                  __html: `
                    document.getElementById('waForm').addEventListener('submit', function(e) {
                      e.preventDefault();
                      var nama = document.getElementById('nama').value;
                      var email = document.getElementById('email').value;
                      var subjek = document.getElementById('subjek').value;
                      var pesan = document.getElementById('pesan').value;
                      
                      var text = "Halo Admin SDIT Iqra 2,\\n\\nSaya ingin bertanya mengenai: *" + subjek + "*\\n\\n" + pesan + "\\n\\nTerima kasih.\\n-" + nama + (email ? " (" + email + ")" : "");
                      window.open("https://wa.me/${whatsappNumber}?text=" + encodeURIComponent(text), "_blank");
                    });
                  `
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Social Media Section */}
      <section style={{ padding: '40px 0 60px 0', textAlign: 'center' }}>
        <AnimatedSection className="container" animation="slide-up">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem' }}>Ikuti Media Sosial Kami</h3>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
            {s['social_facebook'] && <Link href={s['social_facebook']} target="_blank" className="btn-secondary" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}><i className="icon">facebook</i></Link>}
            {s['social_instagram'] && <Link href={s['social_instagram']} target="_blank" className="btn-secondary" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}><i className="icon">photo_camera</i></Link>}
            {s['social_youtube'] && <Link href={s['social_youtube']} target="_blank" className="btn-secondary" style={{ width: '48px', height: '48px', padding: 0, borderRadius: '50%' }}><i className="icon">play_circle_filled</i></Link>}
          </div>
        </AnimatedSection>
      </section>

      {/* Google Maps Wide */}
      <section className="maps-wide" style={{ width: '100%', height: '450px', background: 'var(--color-neutral)' }}>
        {mapsEmbed ? (
          <iframe src={mapsEmbed} width="100%" height="100%" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9CA3AF' }}>Peta belum diatur</div>
        )}
      </section>
    </>
  );
}
