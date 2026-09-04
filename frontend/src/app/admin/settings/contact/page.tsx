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

function InputField({ label, value, onChange, placeholder, type = 'text', hint }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; type?: string; hint?: string;
}) {
  const inputStyle = {
    width: '100%', padding: '0.75rem 1rem',
    border: '1px solid var(--color-border)', borderRadius: 'var(--radius-sm)',
    fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none'
  };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--color-primary)', marginBottom: '0.4rem' }}>{label}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={inputStyle} />
      {hint && <div style={{ fontSize: 12, color: '#9CA3AF', marginTop: '0.25rem' }}>{hint}</div>}
    </div>
  );
}

export default function AdminContactEditorPage() {
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
        contact_hero_image: s('contact_hero_image'),
        contact_side_image: s('contact_side_image'),
        contact_email: s('contact_email'),
        contact_phone: s('contact_phone'),
        whatsapp_number: s('whatsapp_number'),
        contact_address: s('contact_address'),
        contact_office_hours: s('contact_office_hours'),
        contact_maps_embed: s('contact_maps_embed'),
        social_facebook: s('social_facebook'),
        social_instagram: s('social_instagram'),
        social_youtube: s('social_youtube')
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
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Editor Kontak & Sosial Media</h1>
          <p style={{ fontSize: 14, color: 'var(--color-primary)' }}>Kelola data kontak, Google Maps, media sosial, dan halaman kontak sekolah.</p>
        </div>
        <button onClick={handleSave} disabled={saving}
          style={{ padding: '0.65rem 1.5rem', background: 'var(--color-tertiary)', color: '#fff', border: 'none', borderRadius: 'var(--radius-sm)', fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
          {saving ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>

      <SectionCard title="Gambar Latar Halaman Kontak" icon="image">
        <ImageInput label="Hero Image (Bagian Atas)" value={s('contact_hero_image')} onChange={set('contact_hero_image')} />
        <ImageInput label="Gambar Samping Form" value={s('contact_side_image')} onChange={set('contact_side_image')} />
      </SectionCard>

      <SectionCard title="Informasi Kontak & Jam Kerja" icon="contact_phone">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
          <InputField label="Email Resmi" value={s('contact_email')} onChange={set('contact_email')} placeholder="info@sekolah.sch.id" type="email" />
          <InputField label="No. Telepon Kantor" value={s('contact_phone')} onChange={set('contact_phone')} placeholder="(0736) 123456" />
          <InputField label="Nomor WhatsApp Admin (CS)" value={s('whatsapp_number')} onChange={set('whatsapp_number')} placeholder="628123456789" hint="Gunakan format internasional (62) tanpa tanda plus atau spasi." />
          <InputField label="Jam Kantor (Operasional)" value={s('contact_office_hours')} onChange={set('contact_office_hours')} placeholder="Senin - Sabtu: 07.15 - 15.00 WIB" />
        </div>
        <InputField label="Alamat Lengkap" value={s('contact_address')} onChange={set('contact_address')} placeholder="Jl. Contoh No. 1, Kelurahan X, Kota Bengkulu" />
        <InputField label="Embed Google Maps (URL iframe src)" value={s('contact_maps_embed')} onChange={set('contact_maps_embed')}
          placeholder="https://www.google.com/maps/embed?..."
          hint="Buka Google Maps -> Share -> Embed a map -> Copy hanya isi di dalam tanda kutip src='...'" />
      </SectionCard>

      <SectionCard title="Tautan Media Sosial" icon="share">
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
          <div>
            <InputField label="URL Facebook" value={s('social_facebook')} onChange={set('social_facebook')} placeholder="https://facebook.com/SDITIqra2" />
            <InputField label="URL Instagram" value={s('social_instagram')} onChange={set('social_instagram')} placeholder="https://instagram.com/sdit_iqra2" />
          </div>
          <div>
            <InputField label="URL YouTube" value={s('social_youtube')} onChange={set('social_youtube')} placeholder="https://youtube.com/@SDITIqra2" />
          </div>
        </div>
      </SectionCard>
    </div>
  );
}
