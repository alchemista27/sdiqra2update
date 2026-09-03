'use client';
import Link from 'next/link';

export default function AdminPagesList() {
  const staticPages = [
    { title: 'Beranda', slug: 'homepage', path: '/' },
    { title: 'Tentang Sekolah', slug: 'tentang-sekolah', path: '/tentang-sekolah' },
    { title: 'Sambutan Kepala Sekolah', slug: 'sambutan', path: '/tentang-sekolah/sambutan' },
    { title: 'Kontak', slug: 'kontak', path: '/kontak' },
  ];

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-primary)' }}>Halaman Statis</h1>
        <p style={{ color: '#4B5563', marginTop: '0.5rem' }}>Edit konten dari halaman-halaman utama website.</p>
      </header>

      <div style={{ background: '#fff', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'var(--color-neutral)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>Judul Halaman</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>URL / Path</th>
              <th style={{ padding: '1rem', fontWeight: 600, color: 'var(--color-primary)', textAlign: 'right' }}>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {staticPages.map((page, i) => (
              <tr key={page.slug} style={{ borderBottom: i < staticPages.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: '1rem', color: 'var(--color-primary)', fontWeight: 500 }}>{page.title}</td>
                <td style={{ padding: '1rem', color: 'var(--color-primary)', fontSize: '0.875rem' }}>{page.path}</td>
                <td style={{ padding: '1rem', textAlign: 'right' }}>
                  <Link href={`/admin/pages/${page.slug}`} style={{
                    display: 'inline-block', padding: '6px 12px', background: '#E8F5EE', color: 'var(--color-tertiary)',
                    borderRadius: 'var(--radius-sm)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none'
                  }}>
                    Edit Konten
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
