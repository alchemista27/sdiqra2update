'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { settingsApi, menuApi, MenuItem } from '@/lib/api';

export default function Navbar() {
  const pathname = usePathname();
  const [siteName, setSiteName] = useState('Iqra 2');
  const [logoUrl, setLogoUrl] = useState('');
  const [phone, setPhone] = useState('+62 812 3456 7890');
  const [email, setEmail] = useState('info@iqra2.sch.id');
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    settingsApi.getAll().then((settingsRes) => {
      const d = settingsRes.data;
      if (d.site_name) setSiteName(d.site_name);
      if (d.site_logo) setLogoUrl(d.site_logo);
      if (d.contact_phone) setPhone(d.contact_phone);
      if (d.contact_email) setEmail(d.contact_email);
    }).catch(() => {
      console.warn("Info: Tidak dapat mengambil pengaturan situs.");
    });

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
            <Link href={item.url} target={item.openInNewTab ? '_blank' : undefined} className="dropdown-toggle" onClick={() => setOpen(false)}>
              {item.label} <i className="icon dropdown-icon">arrow_drop_down</i>
            </Link>
            <ul className="dropdown-menu">
              {item.children.filter(i => i.isActive).map(child => (
                <li key={child.id}>
                  <Link href={child.url} target={child.openInNewTab ? '_blank' : undefined} onClick={() => setOpen(false)}>
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
          <Link href={item.url} target={item.openInNewTab ? '_blank' : undefined} onClick={() => setOpen(false)}>
            {item.label}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      <div className="topbar">
        <div className="container topbar-content">
          <div className="topbar-contact">
            <span><i className="icon" style={{ fontSize: 16 }}>phone</i> {phone}</span>
            <span><i className="icon" style={{ fontSize: 16 }}>email</i> {email}</span>
          </div>
          <div className="topbar-social">
            <i className="icon">language</i>
            <i className="icon">camera_alt</i>
            <i className="icon">play_circle_filled</i>
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
              // Fallback menu
              <li><Link href="/" onClick={() => setOpen(false)}>Beranda</Link></li>
            )}

            
            <li className="mobile-only">
              <Link href="/ppdb" className="btn-primary" onClick={() => setOpen(false)}>Daftar PPDB</Link>
            </li>
          </ul>
          
          <div className="desktop-only">
            <Link href="/ppdb" className="btn-primary">Daftar PPDB</Link>
          </div>
        </div>
      </nav>

      <style>{`
        .topbar {
          background-color: var(--color-tertiary);
          color: var(--color-on-tertiary);
          padding: var(--spacing-sm) 0;
          font-size: 0.875rem;
        }

        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
        }

        .topbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .topbar-contact span {
          margin-right: var(--spacing-md);
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }

        .topbar-social {
          display: inline-flex;
          align-items: center;
          gap: var(--spacing-sm);
        }
        
        .topbar-social i.icon {
          cursor: pointer;
          font-size: 18px;
        }

        .navbar {
          background-color: var(--color-surface);
          box-shadow: 0 2px 4px rgba(0,0,0,0.05);
          border-bottom: 1px solid var(--color-border);
          position: sticky;
          top: 0;
          z-index: 100;
        }

        .navbar-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) 20px;
        }

        .logo {
          font-family: var(--font-roboto);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--color-tertiary);
          text-decoration: none;
          display: flex;
          align-items: center;
        }

        .nav-links {
          list-style: none;
          display: flex;
          gap: var(--spacing-lg);
          margin: 0;
          padding: 0;
          align-items: center;
        }

        .nav-links > li > a {
          text-decoration: none;
          color: var(--color-primary);
          font-weight: 600;
          transition: color 0.2s;
          display: flex;
          align-items: center;
        }

        .nav-links > li > a:hover {
          color: var(--color-secondary);
        }

        /* Dropdown Styles */
        .dropdown {
          position: relative;
        }
        
        .dropdown-icon {
          font-size: 20px;
          margin-left: -2px;
          transition: transform 0.2s;
        }

        .dropdown-menu {
          position: absolute;
          top: 100%;
          left: 0;
          background-color: var(--color-surface);
          min-width: 220px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          border-radius: var(--radius-sm);
          list-style: none;
          padding: 10px 0;
          margin: 0;
          opacity: 0;
          visibility: hidden;
          transform: translateY(10px);
          transition: all 0.3s ease;
          border: 1px solid var(--color-border);
          z-index: 101;
        }

        .dropdown:hover .dropdown-menu {
          opacity: 1;
          visibility: visible;
          transform: translateY(0);
        }
        
        .dropdown:hover .dropdown-icon {
          transform: rotate(180deg);
        }

        .dropdown-menu li a {
          display: block;
          padding: 10px 20px;
          color: var(--color-primary);
          text-decoration: none;
          font-size: 0.95rem;
          font-weight: 500;
          transition: background-color 0.2s, color 0.2s;
        }

        .dropdown-menu li a:hover {
          background-color: var(--color-neutral);
          color: var(--color-tertiary);
        }

        .btn-primary {
          background-color: var(--color-tertiary);
          color: var(--color-on-tertiary) !important;
          border: none;
          border-radius: var(--radius-sm);
          padding: 10px 20px;
          font-family: var(--font-inter);
          font-size: 0.95rem;
          font-weight: 600;
          text-decoration: none;
          display: inline-block;
          cursor: pointer;
          transition: opacity 0.2s;
        }

        .btn-primary:hover {
          opacity: 0.9;
        }

        .mobile-toggle {
          display: none;
          background: none;
          border: none;
          color: var(--color-primary);
          cursor: pointer;
        }

        .mobile-only {
          display: none;
        }

        @media (max-width: 1024px) {
          .topbar-content {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          .mobile-toggle {
            display: block;
          }
          .desktop-only {
            display: none;
          }
          .mobile-only {
            display: block;
            margin-top: 10px;
          }
          .nav-links {
            display: none;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: var(--color-surface);
            padding: 20px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
            gap: 15px;
            align-items: flex-start;
          }
          .nav-links.mobile-open {
            display: flex;
          }
          
          /* Mobile Dropdown */
          .dropdown-menu {
            position: static;
            opacity: 1;
            visibility: visible;
            transform: none;
            box-shadow: none;
            border: none;
            padding: 5px 0 5px 15px;
            background: transparent;
            min-width: auto;
          }
          .dropdown:hover .dropdown-icon {
            transform: none;
          }
        }
      `}</style>
    </>
  );
}
