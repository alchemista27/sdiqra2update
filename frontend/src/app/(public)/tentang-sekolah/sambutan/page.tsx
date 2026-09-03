import Link from "next/link";

export default function SambutanPage() {
  return (
    <>
      <header className="page-header">
        <h1>Sambutan Kepala Sekolah</h1>
        <div className="breadcrumb">
          <Link href="/">Beranda</Link> &nbsp; / &nbsp;
          <Link href="/tentang-sekolah">Tentang Sekolah</Link> &nbsp; / &nbsp;
          <span>Sambutan</span>
        </div>
      </header>
      <main className="container">
       
        <div className="staff-layout">
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

     
    </>
  );
}
