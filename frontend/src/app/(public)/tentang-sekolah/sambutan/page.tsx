import Link from "next/link";

export default function SambutanPage() {
  return (
    <>
      {/* Page Header */}
      <header className="page-header">
        <h1>Sambutan Kepala Sekolah</h1>
        <div className="breadcrumb">
          <Link href="/">Beranda</Link> &nbsp; / &nbsp; 
          <Link href="/tentang-sekolah">Tentang Sekolah</Link> &nbsp; / &nbsp; 
          <span>Sambutan</span>
        </div>
      </header>

      {/* Main Content */}
      <main className="container">
        
        <div className="staff-layout">
          {/* Left Column: Profile */}
          <aside className="profile-sidebar">
            <div className="profile-photo">
              <span className="material-symbols-outlined">person</span>
              {/* <img src="path/to/kepsek.jpg" alt="Foto Kepala Sekolah" /> */}
            </div>
            <h2 className="profile-name">Ustadz H. Ahmad, M.Pd</h2>
            <div className="profile-title">Kepala SD IT Iqra 2</div>
            
            <div className="profile-contact">
              <div className="contact-item">
                <span className="material-symbols-outlined">mail</span>
                <span>kepsek@sditiqra2.sch.id</span>
              </div>
              <div className="contact-item">
                <span className="material-symbols-outlined">call</span>
                <span>(0736) 123456</span>
              </div>
              <div className="contact-item">
                <span className="material-symbols-outlined">domain</span>
                <span>Ruang Kepala Sekolah, Lt. 1</span>
              </div>
            </div>
          </aside>

          {/* Right Column: Content */}
          <article className="content-article">
            <div className="skoola-blockquote">
              <p>"Pendidikan yang paripurna memadukan keunggulan akademik dengan penanaman akhlakul karimah demi mewujudkan generasi rabbani yang cerdas."</p>
              <footer>— Ustadz H. Ahmad, M.Pd</footer>
            </div>

            <p>Assalamu'alaikum Warahmatullahi Wabarakatuh.</p>

            <p>Alhamdulillah, puji syukur senantiasa kita panjatkan kehadirat Allah SWT atas segala nikmat yang diberikan. Shalawat serta salam senantiasa tercurah kepada baginda Rasulullah Muhammad SAW, keluarga, sahabat, dan umatnya yang senantiasa istiqomah di jalan-Nya.</p>

            <p>Selamat datang di website resmi SD Islam Terpadu Iqra 2 Kota Bengkulu. Sebagai lembaga pendidikan dasar yang berada di bawah naungan Yayasan Alfida, kami memiliki komitmen yang kuat untuk menghadirkan layanan pendidikan yang paripurna, memadukan keunggulan akademik dengan penanaman akhlakul karimah.</p>

            <p>Di era digital saat ini, kehadiran website sekolah menjadi sangat penting sebagai jendela informasi dan media komunikasi antara sekolah dengan orang tua siswa serta masyarakat luas. Kami berharap website ini dapat memberikan gambaran yang komprehensif mengenai profil, program unggulan, dan berbagai aktivitas yang ada di sekolah kami.</p>

            <p>Melalui kurikulum terpadu yang memadukan pendidikan nasional dan nilai-nilai keislaman, kami berupaya mengoptimalkan potensi peserta didik agar tumbuh menjadi pribadi yang seimbang, berwawasan global namun tetap kokoh pada identitas spiritualnya.</p>

            <p>Terima kasih atas kepercayaan Bapak/Ibu yang telah memilih SD IT Iqra 2 sebagai mitra dalam mendidik putra-putri tercinta. Mari bersama-sama kita wujudkan generasi rabbani yang cerdas, berprestasi, dan berakhlak mulia.</p>

            <p className="signature">Wassalamu'alaikum Warahmatullahi Wabarakatuh.</p>
          </article>
        </div>

        {/* Team Grid (Staff Lainnya) */}
        <section className="team-section">
          <div className="team-header">
            <h2>Tenaga Pendidik &amp; Kependidikan</h2>
          </div>
          
          <div className="team-grid">
            {/* Card 1 */}
            <div className="team-card">
              <div className="team-photo-wrap">
                <span className="material-symbols-outlined">person_3</span>
                <div className="team-hover-social">
                  <a href="#" className="social-btn" title="Email"><span className="material-symbols-outlined">mail</span></a>
                  <a href="#" className="social-btn" title="LinkedIn"><span className="material-symbols-outlined">link</span></a>
                </div>
              </div>
              <h3 className="team-name">Ustadzah Siti Aminah</h3>
              <div className="team-role">Waka Kurikulum</div>
            </div>

            {/* Card 2 */}
            <div className="team-card">
              <div className="team-photo-wrap">
                <span className="material-symbols-outlined">person</span>
                <div className="team-hover-social">
                  <a href="#" className="social-btn" title="Email"><span className="material-symbols-outlined">mail</span></a>
                  <a href="#" className="social-btn" title="LinkedIn"><span className="material-symbols-outlined">link</span></a>
                </div>
              </div>
              <h3 className="team-name">Ustadz Budi Santoso</h3>
              <div className="team-role">Waka Kesiswaan</div>
            </div>

            {/* Card 3 */}
            <div className="team-card">
              <div className="team-photo-wrap">
                <span className="material-symbols-outlined">person_4</span>
                <div className="team-hover-social">
                  <a href="#" className="social-btn" title="Email"><span className="material-symbols-outlined">mail</span></a>
                  <a href="#" className="social-btn" title="LinkedIn"><span className="material-symbols-outlined">link</span></a>
                </div>
              </div>
              <h3 className="team-name">Ustadzah Nurul Huda</h3>
              <div className="team-role">Koordinator Tahfidz</div>
            </div>

            {/* Card 4 */}
            <div className="team-card">
              <div className="team-photo-wrap">
                <span className="material-symbols-outlined">person</span>
                <div className="team-hover-social">
                  <a href="#" className="social-btn" title="Email"><span className="material-symbols-outlined">mail</span></a>
                  <a href="#" className="social-btn" title="LinkedIn"><span className="material-symbols-outlined">link</span></a>
                </div>
              </div>
              <h3 className="team-name">Ustadz Rahman Ali</h3>
              <div className="team-role">Guru Kelas 6</div>
            </div>
          </div>
        </section>

      </main>

      <style>{`
        /* Page Header */
        .page-header {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
          padding: calc(var(--spacing-xl) * 2) var(--spacing-lg);
          text-align: center;
          color: var(--color-surface);
        }
        .page-header h1 {
          font-size: 3rem;
          margin-bottom: var(--spacing-sm);
          color: var(--color-surface);
        }
        .breadcrumb a {
          color: var(--color-surface);
          opacity: 0.8;
        }
        .breadcrumb {
          font-size: 0.875rem;
          color: var(--color-primary);
          opacity: 0.8;
          font-weight: 500;
        }
        .breadcrumb a:hover {
          color: var(--color-tertiary);
          text-decoration: underline;
        }

        /* Main Container */
        .container {
          max-width: 1280px;
          margin: 0 auto;
          padding: var(--spacing-xl) var(--spacing-lg);
        }

        /* Staff Layout / Sambutan */
        .staff-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          gap: var(--spacing-xl);
          align-items: start;
        }

        /* Left Column: Profile */
        .profile-sidebar {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--rounded-md);
          padding: var(--spacing-lg);
          text-align: center;
        }
        .profile-photo {
          width: 100%;
          aspect-ratio: 1;
          background: var(--color-neutral);
          border-radius: var(--rounded-sm);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: var(--spacing-md);
          overflow: hidden;
          border: 1px solid var(--color-border);
        }
        .profile-photo .material-symbols-outlined {
          font-size: 5rem;
          color: #ccc;
        }
        .profile-photo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .profile-name {
          font-size: 1.25rem;
          margin-bottom: 4px;
        }
        .profile-title {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-tertiary);
          margin-bottom: var(--spacing-lg);
        }
        .profile-contact {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          text-align: left;
          border-top: 1px solid var(--color-border);
          padding-top: var(--spacing-md);
          font-size: 0.875rem;
        }
        .contact-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        .contact-item .material-symbols-outlined {
          font-size: 1.25rem;
          color: var(--color-tertiary);
        }

        /* Right Column: Content */
        .content-article {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--rounded-md);
          padding: var(--spacing-xl);
        }
        
        .skoola-blockquote {
          border-left: 4px solid var(--color-tertiary);
          margin-bottom: var(--spacing-xl);
          background: var(--color-neutral);
          padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-lg) calc(var(--spacing-lg) - 4px);
          border-radius: 0 var(--rounded-md) var(--rounded-md) 0;
        }
        .skoola-blockquote p {
          font-size: 1.25rem;
          font-style: italic;
          color: var(--color-primary);
          line-height: 1.6;
        }
        .skoola-blockquote footer {
          margin-top: var(--spacing-md);
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--color-tertiary);
        }

        .content-article p {
          margin-bottom: var(--spacing-md);
          color: var(--color-primary);
        }
        .signature {
          margin-top: var(--spacing-xl);
          font-weight: 600;
        }

        /* Team Grid */
        .team-section {
          margin-top: calc(var(--spacing-xl) * 1.5);
        }
        .team-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding-bottom: var(--spacing-sm);
          border-bottom: 1px solid var(--color-border);
        }
        .team-header h2 {
          font-size: 1.5rem;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
          gap: var(--spacing-lg);
        }
        .team-card {
          background: var(--color-surface);
          border: 1px solid var(--color-border);
          border-radius: var(--rounded-md);
          padding: var(--spacing-lg);
          text-align: center;
          transition: transform 0.2s, box-shadow 0.2s;
          position: relative;
        }
        .team-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.05);
        }
        .team-photo-wrap {
          position: relative;
          width: 120px;
          height: 120px;
          margin: 0 auto var(--spacing-md);
          border-radius: 50%;
          overflow: hidden;
          background: var(--color-neutral);
          border: 1px solid var(--color-border);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .team-photo-wrap .material-symbols-outlined {
          font-size: 3rem;
          color: #ccc;
        }
        .team-hover-social {
          position: absolute;
          inset: 0;
          background: rgba(15, 127, 109, 0.85); /* tertiary color with opacity */
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-sm);
          opacity: 0;
          transition: opacity 0.2s;
        }
        .team-card:hover .team-hover-social {
          opacity: 1;
        }
        .social-btn {
          width: 32px;
          height: 32px;
          background: var(--color-surface);
          color: var(--color-tertiary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.2s;
        }
        .social-btn:hover {
          background: var(--color-neutral);
        }
        .social-btn .material-symbols-outlined {
          font-size: 1rem;
          color: inherit;
        }
        .team-name {
          font-family: var(--font-h1);
          font-size: 1rem;
          margin-bottom: 4px;
        }
        .team-role {
          font-size: 0.75rem;
          font-weight: 600;
          color: var(--color-tertiary);
        }

        @media (max-width: 768px) {
          .staff-layout { grid-template-columns: 1fr; }
          .page-header h1 { font-size: 2rem; }
          .content-article { padding: var(--spacing-lg); }
        }
      `}</style>
    </>
  );
}
