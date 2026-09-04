'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { postsApi, pagesApi, categoriesApi } from '@/lib/api';
import { getToken, getUserFromToken } from '@/lib/auth';

export default function AdminDashboard() {
  const [stats, setStats] = useState({ posts: 0, pages: 0, categories: 0 });
  const [recentPosts, setRecentPosts] = useState<any[]>([]);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const token = getToken();
    if (token) setUser(getUserFromToken(token));

    Promise.allSettled([
      postsApi.getAll({ limit: '5' }),
      pagesApi.getAll(),
      categoriesApi.getAll(),
    ]).then((results) => {
      const posts = results[0].status === 'fulfilled' ? results[0].value : { data: [], pagination: { total: 0 } };
      const pages = results[1].status === 'fulfilled' ? results[1].value : { data: [] };
      const cats = results[2].status === 'fulfilled' ? results[2].value : { data: [] };
      
      setStats({ posts: posts.pagination?.total || 0, pages: pages.data?.length || 0, categories: cats.data?.length || 0 });
      setRecentPosts(posts.data ? posts.data.slice(0, 5) : []);
    });
  }, []);

  const statCards = [
    { label: 'Total Berita', value: stats.posts, icon: 'newspaper', href: '/admin/posts' },
    { label: 'Halaman Statis', value: stats.pages, icon: 'description', href: '/admin/pages' },
    { label: 'Kategori', value: stats.categories, icon: 'sell', href: '/admin/categories' },
  ];

  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>
          Selamat datang, {user?.name || 'Admin'}
        </h1>
        <p style={{ color: 'var(--color-primary)', opacity: 0.7, marginTop: '0.25rem' }}>
          Ringkasan aktivitas website SD IT Iqra 2 hari ini.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {statCards.map((card, i) => (
          <div key={i} style={{ backgroundColor: 'var(--color-surface)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{ width: 48, height: 48, borderRadius: 'var(--radius-sm)', backgroundColor: 'var(--color-neutral)', color: 'var(--color-tertiary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{card.icon}</span>
            </div>
            <div>
              <div style={{ fontSize: 13, color: 'var(--color-primary)', opacity: 0.7, fontWeight: 500, marginBottom: '0.25rem' }}>{card.label}</div>
              <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--color-primary)' }}>{card.value}</div>
            </div>
            <Link href={card.href} style={{ marginLeft: 'auto', color: 'var(--color-tertiary)', textDecoration: 'none', fontSize: 13, fontWeight: 500, display: 'flex', alignItems: 'center' }}>
              Lihat <span className="material-symbols-outlined" style={{ fontSize: 16, marginLeft: 4 }}>arrow_forward</span>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ backgroundColor: 'var(--color-surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-border)', overflow: 'hidden' }}>
        <div style={{ padding: '1.25rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h2 style={{ fontSize: 16, fontWeight: 600, color: 'var(--color-primary)' }}>Berita Terbaru</h2>
          <Link href="/admin/posts" style={{ fontSize: 13, color: 'var(--color-tertiary)', textDecoration: 'none', fontWeight: 500 }}>Kelola Semua</Link>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: 'var(--color-neutral)', borderBottom: '1px solid var(--color-border)' }}>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: 13 }}>Judul</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: 13 }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontWeight: 600, color: 'var(--color-primary)', fontSize: 13 }}>Tanggal</th>
            </tr>
          </thead>
          <tbody>
            {recentPosts.length === 0 ? (
              <tr><td colSpan={3} style={{ padding: '2rem', textAlign: 'center', color: 'var(--color-primary)', opacity: 0.5, fontSize: 14 }}>Belum ada berita.</td></tr>
            ) : recentPosts.map((post, i) => (
              <tr key={post.id} style={{ borderBottom: i < recentPosts.length - 1 ? '1px solid var(--color-border)' : 'none' }}>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-primary)', fontSize: 14, fontWeight: 500 }}>{post.title}</td>
                <td style={{ padding: '1rem 1.5rem' }}>
                  <span style={{
                    display: 'inline-block', padding: '4px 8px', borderRadius: 'var(--radius-sm)', fontSize: 12, fontWeight: 600,
                    backgroundColor: post.status === 'PUBLISHED' ? '#D1FAE5' : 'var(--color-neutral)',
                    color: post.status === 'PUBLISHED' ? '#065F46' : 'var(--color-primary)'
                  }}>
                    {post.status}
                  </span>
                </td>
                <td style={{ padding: '1rem 1.5rem', color: 'var(--color-primary)', opacity: 0.7, fontSize: 13 }}>
                  {new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
