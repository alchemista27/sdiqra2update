'use client';
import Link from 'next/link';
import { useSiteSettings } from '@/components/SiteLogo';

export default function Footer() {
  const { siteName, settings } = useSiteSettings();
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-col">
            <h3>{siteName}</h3>
            <p>{settings.footer_copyright || 'Membentuk generasi terbaik masa depan dengan keseimbangan ilmu pengetahuan dan kekuatan iman.'}</p>
            <div className="footer-social">
              {settings.social_facebook && <Link href={settings.social_facebook}><i className="icon">facebook</i></Link>}
              {settings.social_instagram && <Link href={settings.social_instagram}><i className="icon">photo_camera</i></Link>}
              {settings.social_youtube && <Link href={settings.social_youtube}><i className="icon">play_circle_filled</i></Link>}
            </div>
          </div>
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link href="/tentang-sekolah">Tentang Kami</Link></li>
              <li><Link href="/ppdb">Pendaftaran PPDB</Link></li>
              <li><Link href="/berita">Berita & Artikel</Link></li>
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

      <style>{`
        .footer {
          background-color: var(--color-primary);
          color: var(--color-neutral);
          padding-top: 60px;
        }

        .footer h3 {
          color: var(--color-surface);
          margin-bottom: 20px;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .footer-content {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 40px;
          margin-bottom: 40px;
        }

        .footer-social {
          margin-top: var(--spacing-md);
          display: flex;
          gap: var(--spacing-sm);
        }

        .footer-social .icon {
          cursor: pointer;
          color: var(--color-neutral);
          transition: color 0.2s;
        }
       
        .footer-social .icon:hover {
          color: var(--color-secondary);
        }

        .footer-col ul {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .footer-col ul li {
          margin-bottom: var(--spacing-sm);
        }

        .footer-col ul a {
          color: var(--color-border);
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-col ul a:hover {
          color: var(--color-secondary);
        }

        .footer-col p {
          margin-bottom: var(--spacing-sm);
          color: var(--color-border);
          display: flex;
          align-items: center;
          gap: 8px;
        }
       
        .footer-col p .icon {
          font-size: 18px;
        }

        .footer-bottom {
          background-color: #333333;
          text-align: center;
          padding: 20px;
          color: var(--color-border);
          font-size: 0.875rem;
        }
      `}</style>
    </>
  );
}
