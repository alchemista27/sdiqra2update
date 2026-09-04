'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { getToken, getUserFromToken, removeToken } from '@/lib/auth';
import { useSiteSettings } from '@/components/SiteLogo';
import ProfileMenu from '@/components/profile/ProfileMenu';

const navItems = [
  { href: '/admin', icon: 'home', label: 'Dasbor' },
  { href: '/admin/posts', icon: 'article', label: 'Berita & Artikel' },
  { href: '/admin/categories', icon: 'label', label: 'Kategori' },
  { href: '/admin/gallery', icon: 'photo_library', label: 'Galeri' },
  { href: '/admin/media', icon: 'perm_media', label: 'Media Library' },
];

const settingsItems = [
  { href: '/admin/settings/general', icon: 'tune', label: 'Pengaturan Umum' },
  { href: '/admin/settings/homepage', icon: 'web', label: 'Editor Homepage' },
  { href: '/admin/settings/about', icon: 'info', label: 'Editor Tentang Kami' },
  { href: '/admin/settings/contact', icon: 'contact_page', label: 'Editor Kontak' },
  { href: '/admin/settings/sambutan', icon: 'record_voice_over', label: 'Editor Sambutan' },
  { href: '/admin/settings/menus', icon: 'menu', label: 'Menu Navigasi' },
  { href: '/admin/settings/instagram', icon: 'photo_camera', label: 'Instagram' },
  { href: '/admin/users', icon: 'manage_accounts', label: 'Kelola User' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loaded, setLoaded] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const { logoUrl, siteName } = useSiteSettings();

  useEffect(() => {
    if (pathname.startsWith('/admin/ppdb')) setOpenAccordion('ppdb');
    else if (pathname.startsWith('/admin/attendance')) setOpenAccordion('attendance');
  }, [pathname]);

  useEffect(() => {
    if (pathname === '/admin/login') { setLoaded(true); return; }
    const token = getToken();
    if (!token) { router.replace('/admin/login'); return; }
    const userData = getUserFromToken(token);
    if (!userData || !['SUPER_ADMIN', 'ADMIN_HUMAS', 'ADMIN_PERSONALIA', 'KEPALA_SEKOLAH'].includes(userData.role)) {
      router.replace('/admin/login'); return;
    }
    setUser(userData);
    setLoaded(true);
  }, [pathname, router]);

  if (!loaded) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-neutral)' }}><div style={{ color: 'var(--color-primary)', fontSize: 16 }}>Memuat...</div></div>;
  if (pathname === '/admin/login') return <>{children}</>;

  const handleLogout = () => { removeToken(); router.push('/admin/login'); };
  const role = user?.role;
  const showCMS = role && ['SUPER_ADMIN', 'ADMIN_HUMAS'].includes(role);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: 'var(--color-neutral)' }}>
      <aside style={{
        width: 256, backgroundColor: 'var(--color-primary)', color: 'var(--color-surface)',
        display: 'flex', flexDirection: 'column', position: 'fixed',
        top: 0, left: 0, bottom: 0, zIndex: 50,
        transition: 'transform 0.3s ease',
        transform: sidebarOpen ? 'translateX(0)' : undefined,
      }} className="admin-sidebar">
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {logoUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoUrl} alt={siteName} style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', objectFit: 'contain', backgroundColor: 'var(--color-surface)', padding: 2 }} />
          ) : (
            <div style={{ width: 40, height: 40, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: 16 }}>I2</div>
          )}
          <div>
            <div style={{ fontWeight: 600, fontSize: 13 }}>{siteName}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)' }}>Admin Panel</div>
          </div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0.75rem', overflow: 'auto' }}>
          {showCMS && (
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', padding: '0.5rem 0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600 }}>CMS</div>
              {navItems.map(item => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(item.href));
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.15rem',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: isActive ? 'var(--color-surface)' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none', fontSize: 13, fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.15s',
                    borderLeft: isActive ? '3px solid var(--color-tertiary)' : '3px solid transparent',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}

          {role === 'SUPER_ADMIN' && (
            <div>
              <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', padding: '0.5rem 0.75rem', marginBottom: '0.25rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 600, marginTop: '1.5rem' }}>Pengaturan</div>
              {settingsItems.map(item => {
                const isActive = pathname.startsWith(item.href);
                return (
                  <Link key={item.href} href={item.href} style={{
                    display: 'flex', alignItems: 'center', gap: '0.75rem',
                    padding: '0.65rem 0.75rem', borderRadius: 'var(--radius-sm)', marginBottom: '0.15rem',
                    backgroundColor: isActive ? 'rgba(255,255,255,0.1)' : 'transparent',
                    color: isActive ? 'var(--color-surface)' : 'rgba(255,255,255,0.7)',
                    textDecoration: 'none', fontSize: 13, fontWeight: isActive ? 600 : 400,
                    transition: 'all 0.15s',
                    borderLeft: isActive ? '3px solid var(--color-tertiary)' : '3px solid transparent',
                  }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{item.icon}</span>
                    {item.label}
                  </Link>
                );
              })}
            </div>
          )}
        </nav>
        <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: 'var(--radius-sm)', padding: '0.75rem', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{user?.name}</div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.7)', marginTop: '0.15rem' }}>{user?.role?.replace('_', ' ')}</div>
          </div>
          <button onClick={handleLogout} style={{ width: '100%', padding: '0.6rem', backgroundColor: 'rgba(255,255,255,0.1)', color: 'var(--color-surface)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>logout</span> Keluar
          </button>
        </div>
      </aside>
      <div style={{ flex: 1, marginLeft: 256, display: 'flex', flexDirection: 'column' }} className="admin-content">
        <div style={{ backgroundColor: 'var(--color-surface)', borderBottom: '1px solid var(--color-border)', padding: '0.875rem 1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', position: 'sticky', top: 0, zIndex: 40 }}>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)', fontSize: 15 }}>
            {
              [...navItems, ...settingsItems].find(n => pathname === n.href || (n.href !== '/admin' && pathname.startsWith(n.href)))?.label
              || 'Dashboard'
            }
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <Link href="/" target="_blank" style={{ fontSize: 13, color: 'var(--color-tertiary)', textDecoration: 'none', fontWeight: 500 }}>Lihat Website →</Link>
            <ProfileMenu user={user} onLogout={handleLogout} />
          </div>
        </div>
        <main style={{ flex: 1, padding: '2rem 1.5rem' }}>{children}</main>
      </div>

      <style>{`@media (max-width: 768px) { .admin-sidebar { transform: translateX(-100%); } .admin-content { margin-left: 0 !important; } }`}</style>
    </div>
  );
}
