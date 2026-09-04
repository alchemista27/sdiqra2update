'use client';
// Pengaturan Umum: Nama Sekolah, Logo, Favicon, Kontak, Sosial Media
import { useEffect, useState, useRef } from 'react';
import { settingsApi } from '@/lib/api';
import { getToken } from '@/lib/auth';

interface Settings { [key: string]: string }

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.875rem', borderBottom: '1px solid #F3F4F6' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--color-tertiary)' }}>{icon}</span>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-primary)', margin: 0 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function InputField({ label, value, onChange, placeholder, type = 'text', hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; hint?: string;
}) {
  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
    fontSize: 14, fontFamily: 'inherit',
    boxSizing: 'border-box' as const,
    outline: 'none', transition: 'border-color 0.15s',
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)}
        placeholder={placeholder} style={inputStyle} />
      {hint && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: '0.25rem' }}>{hint}</div>}
    </div>
  );
}

function ImageUploadCard({ label, currentUrl, onUpload, hint }: {
  label: string; currentUrl: string; onUpload: (file: File) => void; hint?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.5rem' }}>{label}</label>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ width: 80, height: 80, border: '2px dashed var(--color-border)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', background: 'var(--color-neutral)', flexShrink: 0 }}>
          {currentUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={currentUrl.startsWith('/') ? `${API_URL.replace('/api','')}${currentUrl}` : currentUrl}
              alt={label} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          ) : (
            <span className="material-symbols-outlined" style={{ fontSize: 32, color: '#D1D5DB' }}>image</span>
          )}
        </div>
        <div>
          <button type="button" onClick={() => ref.current?.click()}
            style={{ padding: '0.55rem 1rem', background: 'var(--color-neutral)', color: 'var(--color-primary)', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 16 }}>upload</span> Pilih File
          </button>
          {hint && <div style={{ fontSize: 12, color: '#9CA3AF' }}>{hint}</div>}
          {currentUrl && <div style={{ fontSize: 11, color: 'var(--color-primary)', marginTop: '0.2rem', fontFamily: 'monospace', wordBreak: 'break-all' }}>{currentUrl}</div>}
          <input ref={ref} type="file" accept="image/*" style={{ display: 'none' }}
            onChange={e => { const f = e.target.files?.[0]; if (f) onUpload(f); }} />
        </div>
      </div>
    </div>
  );
}

interface QuickLink {
  label: string;
  url: string;
  external: boolean;
}

function FooterQuickLinksEditor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const [links, setLinks] = useState<QuickLink[]>([]);
  const [newLabel, setNewLabel] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newExternal, setNewExternal] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editLabel, setEditLabel] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editExternal, setEditExternal] = useState(false);

  useEffect(() => {
    if (value) {
      try {
        const parsed = JSON.parse(value);
        if (Array.isArray(parsed)) setLinks(parsed);
      } catch { setLinks([]); }
    } else { setLinks([]); }
  }, [value]);

  const saveToParent = (newLinks: QuickLink[]) => {
    setLinks(newLinks);
    onChange(JSON.stringify(newLinks));
  };

  const handleAdd = () => {
    if (!newLabel.trim() || !newUrl.trim()) return;
    saveToParent([...links, { label: newLabel.trim(), url: newUrl.trim(), external: newExternal }]);
    setNewLabel(''); setNewUrl(''); setNewExternal(false);
  };

  const handleDelete = (idx: number) => {
    saveToParent(links.filter((_, i) => i !== idx));
  };

  const startEdit = (idx: number) => {
    setEditingIndex(idx);
    setEditLabel(links[idx].label);
    setEditUrl(links[idx].url);
    setEditExternal(links[idx].external);
  };

  const saveEdit = () => {
    if (editingIndex === null) return;
    const updated = [...links];
    updated[editingIndex] = { label: editLabel.trim(), url: editUrl.trim(), external: editExternal };
    saveToParent(updated);
    setEditingIndex(null);
  };

  const quickUrls = ['/', '/berita', '/ppdb', '/galeri', '/halaman/tentang-kami'];

  return (
    <div>
      {links.length > 0 && (
        <div style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {links.map((link, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 0.75rem', background: 'var(--color-neutral)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--color-border)' }}>
              {editingIndex === idx ? (
                <>
                  <input value={editLabel} onChange={e => setEditLabel(e.target.value)} placeholder="Label" style={{ flex: 1, padding: '0.4rem 0.6rem', border: '1px solid #D1D5DB', borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
                  <input value={editUrl} onChange={e => setEditUrl(e.target.value)} placeholder="/path" style={{ flex: 1, padding: '0.4rem 0.6rem', border: '1px solid #D1D5DB', borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: 12, color: 'var(--color-primary)', whiteSpace: 'nowrap' }}>
                    <input type="checkbox" checked={editExternal} onChange={e => setEditExternal(e.target.checked)} style={{ accentColor: 'var(--color-tertiary)' }} />External
                  </label>
                  <button onClick={saveEdit} style={{ padding: '0.3rem 0.6rem', background: 'var(--color-tertiary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 12, cursor: 'pointer' }}>✓</button>
                  <button onClick={() => setEditingIndex(null)} style={{ padding: '0.3rem 0.6rem', background: 'var(--color-neutral)', color: 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 12, cursor: 'pointer' }}>✕</button>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined" style={{ fontSize: 16, color: 'var(--color-tertiary)' }}>link</span>
                  <span style={{ flex: 1, fontSize: 13, fontWeight: 600, color: 'var(--color-primary)' }}>{link.label}</span>
                  <span style={{ flex: 1, fontSize: 12, color: 'var(--color-primary)', fontFamily: 'monospace' }}>{link.url}</span>
                  {link.external && <span style={{ fontSize: 10, background: '#FEF3C7', color: '#92400E', padding: '0.1rem 0.4rem', borderRadius: 'var(--radius-sm)' }}>External</span>}
                  <button onClick={() => startEdit(idx)} style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-primary)' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>edit</span></button>
                  <button onClick={() => handleDelete(idx)} style={{ padding: '0.25rem 0.5rem', background: 'none', border: 'none', cursor: 'pointer', color: '#DC2626' }}><span className="material-symbols-outlined" style={{ fontSize: 16 }}>delete</span></button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
        <input value={newLabel} onChange={e => setNewLabel(e.target.value)} placeholder="Label menu" style={{ flex: '1 1 120px', padding: '0.6rem 0.8rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
        <input value={newUrl} onChange={e => setNewUrl(e.target.value)} placeholder="/path" style={{ flex: '1 1 100px', padding: '0.6rem 0.8rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 13 }} />
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: 12, color: 'var(--color-primary)', padding: '0.5rem' }}>
          <input type="checkbox" checked={newExternal} onChange={e => setNewExternal(e.target.checked)} style={{ accentColor: 'var(--color-tertiary)' }} />External
        </label>
        <button onClick={handleAdd} disabled={!newLabel.trim() || !newUrl.trim()} style={{ padding: '0.6rem 1rem', background: newLabel.trim() && newUrl.trim() ? 'var(--color-tertiary)' : 'var(--color-border)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 13, fontWeight: 600, cursor: newLabel.trim() && newUrl.trim() ? 'pointer' : 'not-allowed', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>add</span> Tambah
        </button>
      </div>
      <div style={{ marginTop: '0.75rem' }}>
        <div style={{ fontSize: 11, color: '#9CA3AF', marginBottom: '0.3rem' }}>Pintasan URL:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.25rem' }}>
          {quickUrls.map(u => (
            <button key={u} type="button" onClick={() => setNewUrl(u)} style={{ padding: '0.2rem 0.5rem', background: newUrl === u ? 'var(--color-tertiary)' : 'var(--color-neutral)', color: newUrl === u ? '#fff' : 'var(--color-primary)', border: 'none', borderRadius: 'var(--radius-sm)', fontSize: 11, cursor: 'pointer', fontFamily: 'monospace' }}>{u}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function AdminGeneralSettingsPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  const s = (key: string) => settings[key] || '';
  const set = (key: string) => (val: string) => setSettings(prev => ({ ...prev, [key]: val }));

  useEffect(() => {
    settingsApi.getAll().then(r => {
      setSettings(r.data || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.updateMany(getToken()!, settings);
      showToast('Pengaturan berhasil disimpan!');
    } catch {
      showToast('Gagal menyimpan pengaturan.', 'err');
    }
    setSaving(false);
  };

  const handleLogoUpload = async (file: File) => {
    try {
      const r = await settingsApi.uploadLogo(getToken()!, file);
      if (r.data?.url) { set('site_logo')(r.data.url); showToast('Logo berhasil diupload!'); }
    } catch { showToast('Gagal upload logo.', 'err'); }
  };

  const handleFaviconUpload = async (file: File) => {
    try {
      const r = await settingsApi.uploadFavicon(getToken()!, file);
      if (r.data?.url) { set('site_favicon')(r.data.url); showToast('Favicon berhasil diupload!'); }
    } catch { showToast('Gagal upload favicon.', 'err'); }
  };

  if (loading) return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 300, color: '#9CA3AF', fontSize: 15 }}>
      <span className="material-symbols-outlined" style={{ fontSize: 36, marginRight: '0.5rem', animation: 'spin 1s linear infinite' }}>sync</span> Memuat...
    </div>
  );

  return (
    <div style={{ maxWidth: 760 }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: toast.type === 'ok' ? 'var(--color-primary)' : '#DC2626', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', fontSize: 14, zIndex: 999, animation: 'fadeIn 0.2s ease' }}>
          {toast.msg}
        </div>
      )}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800, color: 'var(--color-primary)', marginBottom: '0.25rem' }}>Pengaturan Umum</h1>
          <p style={{ fontSize: 14, color: 'var(--color-primary)', margin: 0 }}>Konfigurasi identitas sekolah, logo, kontak, dan media sosial.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '0.65rem 1.5rem', background: 'var(--color-tertiary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: 14 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{saving ? 'sync' : 'save'}</span>
          {saving ? 'Menyimpan...' : 'Simpan Semua'}
        </button>
      </div>
      <SectionCard title="Identitas Sekolah" icon="school">
        <InputField label="Nama Sekolah" value={s('site_name')} onChange={set('site_name')} placeholder="SD Islam Terpadu Iqra 2" />
      </SectionCard>
      <SectionCard title="Tombol Navigasi Navbar" icon="smart_button">
        <InputField label="Teks Tombol PPDB" value={s('header_ppdb_text')} onChange={set('header_ppdb_text')} placeholder="Daftar PPDB" />
        <InputField label="Tautan Tombol PPDB" value={s('header_ppdb_url')} onChange={set('header_ppdb_url')} placeholder="https://ppdb.iqra2.sch.id" hint="Pastikan memakai awalan http:// atau https://" />
      </SectionCard>
      
      <SectionCard title="Footer" icon="flag">
        <InputField label="Deskripsi Singkat" value={s('footer_description')} onChange={set('footer_description')} placeholder="Membentuk generasi..." hint="Teks di bawah nama sekolah pada footer kiri" />
        <InputField label="Teks Copyright" value={s('footer_copyright')} onChange={set('footer_copyright')} placeholder="Hak cipta dilindungi" hint="Teks di paling bawah footer" />
      </SectionCard>
      <SectionCard title="Menu Cepat Footer" icon="link">
        <FooterQuickLinksEditor value={s('footer_quick_links')} onChange={set('footer_quick_links')} />
      </SectionCard>
      <SectionCard title="Logo & Favicon" icon="image">
        <ImageUploadCard
          label="Logo Sekolah"
          currentUrl={s('site_logo')}
          onUpload={handleLogoUpload}
          hint="Rekomendasi: PNG transparan, min. 200×200px"
        />
        <div style={{ borderTop: '1px solid #F3F4F6', marginBottom: '1rem' }} />
        <ImageUploadCard
          label="Favicon (ikon tab browser)"
          currentUrl={s('site_favicon')}
          onUpload={handleFaviconUpload}
          hint="Rekomendasi: ICO atau PNG, 32×32px atau 64×64px"
        />
        <div style={{ background: '#F0FDF4', border: '1px solid #A7F3D0', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', fontSize: 13, color: '#065F46' }}>
          <strong>Info:</strong> Setelah upload logo baru, klik &quot;Simpan Semua&quot; untuk memastikan URL tersimpan ke database.
        </div>
      </SectionCard>
      <div style={{ padding: '1rem', background: '#FEF3C7', color: '#92400E', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '14px', border: '1px solid #FDE68A' }}>
        <strong>Pindah Lokasi:</strong> Pengaturan <strong>Kontak, Lokasi, dan Media Sosial</strong> telah dipindahkan ke menu <strong>Editor Kontak</strong>.
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'flex-end', paddingTop: '0.5rem' }}>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '0.75rem 2rem', background: 'var(--color-tertiary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-md)', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: 15 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{saving ? 'sync' : 'check_circle'}</span>
          {saving ? 'Menyimpan...' : 'Simpan Pengaturan'}
        </button>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        input:focus { border-color: #1B6B44 !important; box-shadow: 0 0 0 3px rgba(27,107,68,0.1); }
      `}</style>
    </div>
  );
}
