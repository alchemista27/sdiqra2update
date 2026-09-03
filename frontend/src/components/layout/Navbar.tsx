'use client';
import Link from 'next/link';
import { formatUrl } from "@/lib/urlUtils";
import { useState, useEffect } from 'react';
import { useSiteSettings } from '@/components/SiteLogo';
import { usePathname } from 'next/navigation';
import { settingsApi, menuApi, MenuItem } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const { siteName, logoUrl, settings } = useSiteSettings();
  const phone = settings.contact_phone || '+62 812 3456 7890';
  const email = settings.contact_email || 'info@iqra2.sch.id';
  const ppdbUrl = settings.header_ppdb_url || '/ppdb';
  const ppdbText = settings.header_ppdb_text || 'Daftar PPDB';
  
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    menuApi.getAll().then((res) => {
      if (res.data) setMenus(res.data);
    }).catch(() => console.warn("Info: Tidak dapat memuat menu."));
  }, []);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const logoSrc = logoUrl
    ? (logoUrl.startsWith('http') ? logoUrl : `${API_BASE}${logoUrl}`)
    : null;

  const renderNav = (items: MenuItem[]) => {
    return items.filter(i => i.isActive).map(item => {
      if (item.children && item.children.length > 0) {
        return (
          <li key={item.id} className="dropdown">
            <Link href={formatUrl(item.url)} target={item.openInNewTab ? '_blank' : undefined} className="dropdown-toggle" onClick={() => setOpen(false)}>
              {item.label} <i className="icon dropdown-icon">arrow_drop_down</i>
            </Link>
            <ul className="dropdown-menu">
              {item.children.filter(i => i.isActive).map(child => (
                <li key={child.id}>
                  <Link href={formatUrl(child.url)} target={child.openInNewTab ? '_blank' : undefined} onClick={() => setOpen(false)}>
                    {child.label}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
        );
      }
      return (
        <li key={item.id}>
          <Link href={formatUrl(item.url)} target={item.openInNewTab ? '_blank' : undefined} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <div className="topbar hidden md:block">
        <div className="container topbar-content">
          <div className="topbar-contact">
            <span><i className="icon" style={{ fontSize: 16 }}>phone</i> {phone}</span>
            <span><i className="icon" style={{ fontSize: 16 }}>email</i> {email}</span>
          </div>
          <div className="topbar-social">
            {settings.social_facebook && <Link href={formatUrl(settings.social_facebook)} target="_blank"><i className="icon">facebook</i></Link>}
            {settings.social_instagram && <Link href={formatUrl(settings.social_instagram)} target="_blank"><i className="icon">photo_camera</i></Link>}
            {settings.social_youtube && <Link href={formatUrl(settings.social_youtube)} target="_blank"><i className="icon">play_circle_filled</i></Link>}
          </div>
        </div>
      </div>

      <nav className="navbar">
        <div className="container navbar-content">
          <Link href="/" className="logo">
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={logoSrc} alt={siteName} style={{ height: 40, objectFit: 'contain' }} />
            ) : (
              siteName
            )}
          </Link>
         
          <button className="mobile-toggle" onClick={() => setOpen(!open)}>
            <i className="icon">{open ? 'close' : 'menu'}</i>
          </button>

          <ul className={`nav-links ${open ? 'mobile-open' : ''}`}>
            {menus.length > 0 ? renderNav(menus) : (
              <li><Link href="/" onClick={() => setOpen(false)}>Beranda</Link></li>
            )}

            <li className="mobile-only">
              <Link href={formatUrl(ppdbUrl)} className="btn-primary" onClick={() => setOpen(false)}>{ppdbText}</Link>
            </li>
          </ul>
         
          <div className="desktop-only">
            <Link href={formatUrl(ppdbUrl)} className="btn-primary">{ppdbText}</Link>
          </div>
        </div>
      </nav>
    </>
  );
}
