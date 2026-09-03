'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { pagesApi } from '@/lib/api';
import { getToken } from '@/lib/auth';
import dynamic from 'next/dynamic';
import Link from 'next/link';

const RichTextEditor = dynamic(() => import('@/components/cms/RichTextEditor'), {
  ssr: false,
  loading: () => <div style={{ minHeight: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Memuat editor...</div>,
});

export default function EditPage() {
  const router = useRouter();
  const params = useParams();
  const slug = params.slug as string;
 
  const [form, setForm] = useState({ title: '', content: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    pagesApi.getBySlug(slug).then(r => {
      setForm({ title: r.data.title, content: r.data.content });
      setLoading(false);
    }).catch(e => {
      setError('Gagal memuat halaman, pastikan halaman statis ini ada di database.');
      setLoading(false);
    });
  }, [slug]);

  const handleSave = async () => {
    if (!form.title) {
      setError('Judul tidak boleh kosong.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      const token = getToken();
      if (!token) throw new Error('Not authenticated');
      await pagesApi.updateBySlug(token, slug, form);
      alert('Halaman berhasil diperbarui!');
      router.push('/admin/pages');
    } catch (e: any) {
      setError(e.message || 'Gagal menyimpan halaman.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}>
      <header style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <Link href="/admin/pages" style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          width: 40, height: 40, borderRadius: '50%', background: '#F3F4F6', color: '#4B5563', textDecoration: 'none'
        }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>arrow_back</span>
        </Link>
        <div>
          <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827' }}>Edit Halaman: {form.title}</h1>
          <div style={{ fontSize: 13, color: '#6B7280', marginTop: 4 }}>Path: /{slug === 'homepage' ? '' : slug}</div>
        </div>
      </header>

      {error && <div style={{ background: '#FEE2E2', color: '#B91C1C', padding: '1rem', borderRadius: 8, marginBottom: '1.5rem' }}>{error}</div>}

      <div style={{ background: '#fff', padding: '2rem', borderRadius: 12, border: '1px solid #E5E7EB' }}>
        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Judul Halaman</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            style={{ width: '100%', padding: '12px 16px', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 15 }}
          />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label style={{ display: 'block', fontSize: 14, fontWeight: 600, color: '#374151', marginBottom: 8 }}>Konten (HTML)</label>
          <div style={{ border: '1.5px solid #E5E7EB', borderRadius: 10, overflow: 'hidden' }}>
            <RichTextEditor
              content={form.content}
              onChange={(html: string) => setForm({ ...form, content: html })}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button
            onClick={handleSave}
            disabled={saving}
            style={{
              padding: '12px 24px', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 8,
              fontSize: 15, fontWeight: 600, cursor: saving ? 'not-allowed' : 'pointer', opacity: saving ? 0.7 : 1
            }}
          >
            {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
          </button>
        </div>
      </div>
    </div>
  );
}
