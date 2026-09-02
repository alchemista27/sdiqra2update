'use client';
// src/app/admin/login/page.tsx - Halaman Login Admin
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { authApi } from '@/lib/api';
import { setToken } from '@/lib/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [logoSrc, setLogoSrc] = useState<string | null>(null);
  const [siteName, setSiteName] = useState('SD IT Iqra 2 Kota Bengkulu');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const { settingsApi } = await import('@/lib/api');
        const res = await settingsApi.getAll();
        const settings: Record<string, string> = res.data;
        if (settings.site_name) setSiteName(settings.site_name);
        if (settings.site_logo) {
          const apiBase = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
          setLogoSrc(settings.site_logo.startsWith('http') ? settings.site_logo : `${apiBase}${settings.site_logo}`);
        }
      } catch (err) {
        console.warn('Info: Tidak dapat memuat pengaturan situs (server mungkin offline).');
      }
    };
    fetchSettings();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const result = await authApi.login(email, password);
      setToken(result.data.token);
      const user = result.data.user as { role: string };
      if (!['SUPER_ADMIN', 'ADMIN_CMS', 'ADMIN_PPDB', 'KEPALA_SEKOLAH', 'KARYAWAN'].includes(user.role)) {
        setError('Akses ditolak. Akun ini tidak memiliki akses dashboard.');
        return;
      }
      router.push('/admin');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Login gagal.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--color-neutral)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem' }}>

      <div style={{ backgroundColor: 'var(--color-surface)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '3rem', width: '100%', maxWidth: 440, position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="Logo Sekolah" style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', objectFit: 'contain', backgroundColor: 'var(--color-surface)', margin: '0 auto 1rem', border: '1px solid var(--color-border)' }} />
          ) : (
            <div style={{ width: 64, height: 64, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem', color: 'var(--color-on-tertiary)', fontWeight: 800, fontSize: 24 }}>I2</div>
          )}
          <h1 style={{ fontFamily: 'var(--font-roboto)', fontSize: 22, fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Dashboard Admin</h1>
          <p style={{ fontFamily: 'var(--font-inter)', fontSize: 13, color: 'var(--color-primary)', opacity: 0.8 }}>{siteName}</p>
        </div>

        <form onSubmit={handleSubmit}>
          {error && (
            <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: 14 }}>
              {error}
            </div>
          )}
          
          <div style={{ marginBottom: '1.25rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: 6 }}>Email / Username</label>
            <input 
              type="text" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@iqra2.sch.id"
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 14, backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', outline: 'none' }} 
            />
          </div>
          
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: 6 }}>Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{ width: '100%', padding: '12px 14px', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 14, backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', outline: 'none' }} 
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              width: '100%', padding: '12px', backgroundColor: 'var(--color-tertiary)', color: 'var(--color-on-tertiary)', 
              border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 14, fontWeight: 600, cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.8 : 1, transition: 'all 0.2s'
            }}>
            {loading ? 'Memeriksa...' : 'Masuk Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
