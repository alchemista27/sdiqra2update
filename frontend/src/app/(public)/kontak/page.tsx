export default function KontakPage() {
  return (
    <>
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
      <main className="main-contact">
        <div className="main-left">
          <h2>Mari Terhubung Bersama Kami</h2>
          <p>
            Jika Anda memiliki pertanyaan seputar informasi pendaftaran, program unggulan sekolah, atau hal lainnya, silakan isi formulir di samping atau kunjungi lokasi kami. Kami akan merespons pertanyaan Anda sesegera mungkin.
          </p>
          <div className="map-placeholder">
            <span>Kotak Abu-abu Placeholder Google Maps</span>
          </div>
        </div>
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

     
    </>
  );
}
