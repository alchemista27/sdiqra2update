export default function KontakPage() {
  return (
    <>
      {/* Page Header */}
      <header className="page-header">
        <h1>Kontak Kami</h1>
      </header>

      {/* Contact Grid (3 Cards) */}
      <section className="contact-grid">
        <div className="contact-card">
          <div className="contact-icon">
            <span className="material-symbols-outlined">location_on</span>
          </div>
          <h3>Alamat Lokasi</h3>
          <p>Jl. Merdeka No. 123, Kelurahan Pagar Dewa,<br />Kecamatan Selebar, Kota Bengkulu</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">
            <span className="material-symbols-outlined">call</span>
          </div>
          <h3>Telepon</h3>
          <p>(0736) 123456<br />+62 812-3456-7890 (WA)</p>
        </div>
        <div className="contact-card">
          <div className="contact-icon">
            <span className="material-symbols-outlined">mail</span>
          </div>
          <h3>Email</h3>
          <p>info@sdiqra2bengkulu.sch.id</p>
        </div>
      </section>

      {/* Main Section */}
      <main className="main-contact">
        
        {/* Kiri: Deskripsi & Map */}
        <div className="main-left">
          <h2>Mari Terhubung Bersama Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan seputar informasi pendaftaran, program unggulan sekolah, atau hal lainnya, silakan isi formulir di samping atau kunjungi lokasi kami. Kami akan merespons pertanyaan Anda sesegera mungkin.
          </p>
          <div className="map-placeholder">
            <span>Kotak Abu-abu Placeholder Google Maps</span>
          </div>
        </div>

        {/* Kanan: Form Kontak */}
        <div className="main-right">
          <div className="form-card">
            <h3>Tinggalkan Pesan</h3>
            <form>
              <div className="form-group">
                <label htmlFor="nama">Nama Lengkap</label>
                <input type="text" id="nama" className="input-field" placeholder="Masukkan nama lengkap Anda" />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input type="email" id="email" className="input-field" placeholder="Masukkan alamat email Anda" />
              </div>
              <div className="form-group">
                <label htmlFor="subjek">Subjek</label>
                <input type="text" id="subjek" className="input-field" placeholder="Subjek pesan" />
              </div>
              <div className="form-group">
                <label htmlFor="pesan">Pesan</label>
                <textarea id="pesan" className="input-field" rows={5} placeholder="Tulis pesan Anda di sini..."></textarea>
              </div>
              <button type="button" className="btn-submit">Kirim Pesan</button>
            </form>
          </div>
        </div>
      </main>

      <style>{`
        /* Page Header */
        .page-header {
          background: linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('https://images.unsplash.com/photo-1577896851231-70ef18881754?q=80&w=2070&auto=format&fit=crop') center/cover no-repeat;
          color: var(--color-on-tertiary);
          padding: calc(var(--spacing-lg) * 4) var(--spacing-lg) calc(var(--spacing-lg) * 5);
          text-align: center;
        }

        .page-header h1 {
          margin: 0;
          font-size: 2.5rem;
          color: var(--color-on-tertiary);
        }

        /* Contact Grid */
        .contact-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-lg);
          max-width: 1200px;
          margin: calc(var(--spacing-lg) * -3) auto var(--spacing-lg) auto;
          padding: 0 var(--spacing-lg);
          position: relative;
          z-index: 10;
        }

        .contact-card {
          background: var(--color-surface);
          border-radius: var(--radius-md);
          padding: calc(var(--spacing-lg) * 1.5);
          text-align: center;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
          border: 1px solid var(--color-border);
        }

        .contact-icon {
          width: 64px;
          height: 64px;
          background: var(--color-neutral);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto var(--spacing-md) auto;
          color: var(--color-tertiary);
        }

        .contact-icon span {
          font-size: 32px;
        }

        .contact-card h3 {
          margin-bottom: var(--spacing-sm);
          color: var(--color-primary);
        }

        .contact-card p {
          margin: 0;
          color: var(--color-primary);
          opacity: 0.8;
          line-height: 1.5;
        }

        /* Main Section */
        .main-contact {
          max-width: 1200px;
          margin: calc(var(--spacing-lg) * 2) auto calc(var(--spacing-lg) * 3) auto;
          padding: 0 var(--spacing-lg);
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: calc(var(--spacing-lg) * 2);
        }

        .main-left h2 {
          margin-bottom: var(--spacing-md);
        }

        .main-left p {
          line-height: 1.6;
          margin-bottom: var(--spacing-lg);
        }

        .map-placeholder {
          width: 100%;
          height: 350px;
          background: #e5e7eb;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--color-primary);
          font-weight: 500;
        }

        .form-card {
          background: var(--color-surface);
          border-radius: var(--radius-md);
          padding: calc(var(--spacing-lg) * 1.5);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
          border: 1px solid var(--color-border);
        }

        .form-card h3 {
          margin-bottom: var(--spacing-lg);
        }

        .form-group {
          margin-bottom: var(--spacing-md);
        }

        .form-group label {
          display: block;
          margin-bottom: var(--spacing-sm);
          font-weight: 500;
          font-family: 'Inter', sans-serif;
          font-size: 0.875rem;
        }

        .input-field {
          width: 100%;
          padding: 10px 14px;
          border: 1px solid var(--color-border);
          border-radius: var(--radius-sm);
          font-family: 'Inter', sans-serif;
          font-size: 1rem;
          background-color: var(--color-surface);
          color: var(--color-primary);
        }

        .input-field:focus {
          outline: 2px solid var(--color-secondary);
          border-color: transparent;
        }

        textarea.input-field {
          resize: vertical;
        }

        .btn-submit {
          background: var(--color-tertiary);
          color: var(--color-on-tertiary);
          padding: 12px 20px;
          border: none;
          border-radius: var(--radius-sm);
          font-weight: 600;
          font-size: 1rem;
          cursor: pointer;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr;
            margin-top: var(--spacing-lg);
          }
          .page-header {
            padding-bottom: calc(var(--spacing-lg) * 2);
          }
          .main-contact {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </>
  );
}
