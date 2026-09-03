'use client';
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
  const [showPassword, setShowPassword] = useState(false);

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
    <div style={{ display: 'flex', minHeight: '100vh', width: '100%', backgroundColor: 'var(--color-neutral)' }}>
      
      {/* Kolom Kiri - Tampilan Identitas (Mirip PPDB Alfida) */}
      <div className="login-sidebar" style={{
        display: 'none', // Diatur lewat CSS media query nanti
        width: '40%',
        background: 'linear-gradient(135deg, var(--color-tertiary) 0%, var(--color-secondary) 100%)',
        color: 'var(--color-on-tertiary)',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '3rem',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Dekorasi Cahaya */}
        <div style={{
          position: 'absolute', bottom: '-5rem', right: '-5rem', width: '20rem', height: '20rem',
          borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.1)', filter: 'blur(40px)', pointerEvents: 'none'
        }}></div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', position: 'relative', zIndex: 10 }}>
          {logoSrc ? (
            <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.25rem' }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={logoSrc} alt="Logo" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>
          ) : (
             <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.5rem', backgroundColor: 'var(--color-surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-tertiary)', fontWeight: 800 }}>I2</div>
          )}
          <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.5rem', letterSpacing: '-0.025em', color: 'var(--color-surface)' }}>
            SIM-Iqra2
          </span>
        </div>

        <div style={{ margin: 'auto 0', position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 800, lineHeight: 1.2, color: 'var(--color-surface)', marginBottom: '1rem' }}>
            Sistem Informasi Manajemen Terpadu
          </h1>
          <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.9)', maxWidth: '28rem', lineHeight: 1.5 }}>
            Layanan pengelolaan pendidikan, pendaftaran calon siswa baru (PPDB), dan administrasi di lingkungan <strong>{siteName}</strong>.
          </p>
        </div>

        <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', position: 'relative', zIndex: 10 }}>
          &copy; {new Date().getFullYear()} {siteName}. All rights reserved.
        </div>
      </div>

      {/* Kolom Kanan - Form Login */}
      <div style={{
        flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', backgroundColor: 'var(--color-surface)'
      }}>
        <div style={{ width: '100%', maxWidth: '24rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          
          {/* Header untuk Mobile */}
          <div className="login-mobile-header" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            {logoSrc && <img src={logoSrc} alt="Logo" style={{ height: '2rem', objectFit: 'contain' }} />}
            <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: '1.25rem', color: 'var(--color-tertiary)' }}>SIM-Iqra2</span>
          </div>

          <div style={{ width: '100%', textAlign: 'center', marginBottom: '1.5rem' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Masuk ke SIM-Iqra2</h2>
            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>Masukkan email dan password akun Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
            {error && (
              <div style={{ backgroundColor: '#FEF2F2', border: '1px solid #FECACA', color: '#DC2626', borderRadius: '0.375rem', padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
                {error}
              </div>
            )}
           
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>Email <span style={{color: '#EF4444'}}>*</span></label>
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nama@email.com"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.25rem', fontSize: '0.875rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
            </div>
           
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem', position: 'relative' }}>
              <label style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-primary)' }}>Password <span style={{color: '#EF4444'}}>*</span></label>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: '0.25rem', fontSize: '0.875rem', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)', outline: 'none', transition: 'border-color 0.2s' }}
                onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                onBlur={(e) => e.target.style.borderColor = 'var(--color-border)'}
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '0.75rem', top: '2rem', background: 'none', border: 'none', color: '#9CA3AF', cursor: 'pointer', padding: 0 }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '1.125rem' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
              </button>
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                width: '100%', padding: '0.75rem 1.5rem', backgroundColor: 'var(--color-tertiary)', color: 'var(--color-on-tertiary)',
                border: 'none', borderRadius: '0.25rem', fontSize: '1rem', fontWeight: 500, cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.8 : 1, transition: 'background-color 0.2s', marginTop: '0.5rem'
              }}>
              <span className="material-symbols-outlined" style={{ fontSize: '1.25rem' }}>login</span>
              {loading ? 'Memeriksa...' : 'Masuk'}
            </button>
          </form>

          {/* <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--color-border)', width: '100%', textAlign: 'center', fontSize: '0.75rem', color: '#4B5563' }}>
            Belum punya akun? <a href="/register" style={{ color: 'var(--color-tertiary)', fontWeight: 600, textDecoration: 'none' }}>Daftar akun orang tua</a>
          </div> */}

        </div>
      </div>

      <style dangerouslySetInnerHTML={{__html: `
        @media (min-width: 1024px) {
          .login-sidebar { display: flex !important; }
          .login-mobile-header { display: none !important; }
        }
      `}} />
    </div>
  );
}
