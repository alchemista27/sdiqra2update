'use client';
import { useEffect, useState } from 'react';
import { settingsApi } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ImageInput } from '@/components/admin/MediaPickerModal';

type Settings = Record<string, string>

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-md)', padding: '1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.875rem', borderBottom: '1px solid #F3F4F6' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: 'var(--color-tertiary)' }}>{icon}</span>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-primary)', margin: 0, flex: 1 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, textarea, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; textarea?: boolean; rows?: number;
}) {
  const baseStyle = { width: '100%', padding: '0.7rem 1rem', border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)', fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none' };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...baseStyle, resize: 'vertical', lineHeight: 1.6 }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={baseStyle} />
      }
    </div>
  );
}

export default function AdminSambutanEditorPage() {
  const [settings, setSettings] = useState<Settings>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    settingsApi.getAll().then(r => {
      setSettings(r.data || {});
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const s = (key: string) => settings[key] || '';
  const set = (key: string) => (val: string) => setSettings(prev => ({ ...prev, [key]: val }));

  const handleSave = async () => {
    setSaving(true);
    try {
      await settingsApi.updateMany(getToken()!, {
        sambutan_hero_image: s('sambutan_hero_image'),
        about_principal_image: s('about_principal_image'), 
        about_principal_name: s('about_principal_name'), 
        about_principal_message: s('about_principal_message'),
        sambutan_cta_image: s('sambutan_cta_image')
      });
      showToast('Berhasil disimpan!');
    } catch { showToast('Gagal menyimpan.', 'err'); }
    setSaving(false);
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat...</div>;

  return (
    <div style={{ maxWidth: 800, paddingBottom: '4rem' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: toast.type === 'ok' ? 'var(--color-primary)' : '#DC2626', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 'var(--radius-md)', fontSize: 14, zIndex: 999 }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Editor Sambutan Kepala Sekolah</h1>
          <p style={{ fontSize: 14, color: 'var(--color-primary)' }}>Ubah profil kepala sekolah, pesan sambutan, dan gambar halaman sambutan.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '0.65rem 1.5rem', background: 'var(--color-tertiary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      <SectionCard title="Pengaturan Halaman & Profil" icon="record_voice_over">
        <ImageInput label="Gambar Latar Hero (Halaman Sambutan)" value={s('sambutan_hero_image')} onChange={set('sambutan_hero_image')} />
        <ImageInput label="Foto Profil Kepala Sekolah" value={s('about_principal_image')} onChange={set('about_principal_image')} />
        <TextInput label="Nama Kepala Sekolah & Gelar" value={s('about_principal_name')} onChange={set('about_principal_name')} />
        <TextInput label="Pesan Sambutan" value={s('about_principal_message')} onChange={set('about_principal_message')} textarea rows={8} />
        
        <div style={{ borderTop: '1px solid var(--color-border)', margin: '1.5rem 0' }}></div>
        <div style={{ marginBottom: '1rem', fontWeight: 600, color: 'var(--color-primary)' }}>Banner Ajakan (Call to Action) Bawah</div>
        <ImageInput label="Gambar Latar Banner CTA" value={s('sambutan_cta_image')} onChange={set('sambutan_cta_image')} />
      </SectionCard>
    </div>
  );
}
