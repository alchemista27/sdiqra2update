'use client';
import Link from 'next/link';
import { formatUrl } from '@/lib/urlUtils';
import { useSiteSettings } from '@/components/SiteLogo';

export default function Footer() {
  const { siteName, settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-content">
        <div className="footer-col">
          <h3>{siteName}</h3>
          <p>{settings.footer_copyright || 'Membentuk generasi terbaik masa depan dengan keseimbangan ilmu pengetahuan dan kekuatan iman.'}</p>
          <div className="footer-social">
            {settings.social_facebook && <Link href={formatUrl(settings.social_facebook)}><i className="icon">facebook</i></Link>}
            {settings.social_instagram && <Link href={formatUrl(settings.social_instagram)}><i className="icon">photo_camera</i></Link>}
            {settings.social_youtube && <Link href={formatUrl(settings.social_youtube)}><i className="icon">play_circle_filled</i></Link>}
          </div>
        </div>
        <div className="footer-col">
          <h3>Quick Links</h3>
          <ul>
            <li><Link href="/tentang-sekolah">Tentang Kami</Link></li>
            <li><Link href="/ppdb">Pendaftaran PPDB</Link></li>
            <li><Link href="/berita">Berita &amp; Artikel</Link></li>
            <li><Link href="/kontak">Kontak Kami</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h3>Contact Info</h3>
          <p><i className="icon">location_on</i> {settings.contact_address || 'Jl. Pendidikan No. 123, Kota Bengkulu'}</p>
          <p><i className="icon">phone</i> {settings.contact_phone || '+62 812 3456 7890'}</p>
          <p><i className="icon">email</i> {settings.contact_email || 'info@iqra2.sch.id'}</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {currentYear} {siteName}. All rights reserved.</p>
      </div>
    </footer>
  );
}
