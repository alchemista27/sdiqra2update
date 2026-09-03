'use client';
import { useEffect, useState } from 'react';
import { settingsApi } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ImageInput } from '@/components/admin/MediaPickerModal';

interface GenericItem { image?: string; name?: string; role?: string }
type Settings = Record<string, string>

function SectionCard({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: '#fff', border: '1px solid #E5E7EB', borderRadius: 16, padding: '1.5rem', marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.25rem', paddingBottom: '0.875rem', borderBottom: '1px solid #F3F4F6' }}>
        <span className="material-symbols-outlined" style={{ fontSize: 22, color: '#1B6B44' }}>{icon}</span>
        <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0, flex: 1 }}>{title}</h2>
      </div>
      {children}
    </div>
  );
}

function TextInput({ label, value, onChange, placeholder, textarea, rows = 3 }: {
  label: string; value: string; onChange: (v: string) => void;
  placeholder?: string; textarea?: boolean; rows?: number;
}) {
  const baseStyle = { width: '100%', padding: '0.7rem 1rem', border: '1.5px solid #E5E7EB', borderRadius: 10, fontSize: 14, fontFamily: 'inherit', boxSizing: 'border-box' as const, outline: 'none' };
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>{label}</label>
      {textarea
        ? <textarea value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{ ...baseStyle, resize: 'vertical', lineHeight: 1.6 }} />
        : <input value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder} style={baseStyle} />
      }
    </div>
  );
}

export default function AdminAboutEditorPage() {
  const [settings, setSettings] = useState<Settings>({});
  
  // JSON arrays
  const [team, setTeam] = useState<GenericItem[]>([]);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; type: 'ok' | 'err' } | null>(null);

  const showToast = (msg: string, type: 'ok' | 'err' = 'ok') => {
    setToast({ msg, type });
    setTimeout(() => setToast(null), 2500);
  };

  useEffect(() => {
    settingsApi.getAll().then(r => {
      const d = r.data || {};
      setSettings(d);
      const parse = (k: string) => { try { return JSON.parse(d[k] || '[]'); } catch { return []; } };
      
      setTeam(parse('about_team'));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const s = (key: string) => settings[key] || '';
  const set = (key: string) => (val: string) => setSettings(prev => ({ ...prev, [key]: val }));

  const saveSection = async (section: string, payload: Record<string, string>) => {
    setSaving(section);
    try {
      await settingsApi.updateMany(getToken()!, payload);
      showToast('Berhasil disimpan!');
    } catch { showToast('Gagal menyimpan.', 'err'); }
    setSaving(null);
  };

  // Helper for Lists
  const renderListEditor = (
    list: GenericItem[], 
    setList: React.Dispatch<React.SetStateAction<GenericItem[]>>, 
    fields: ('image'|'name'|'role')[],
    sectionName: string,
    dbKey: string
  ) => {
    const addItem = () => setList([...list, {}]);
    const removeItem = (i: number) => setList(list.filter((_, idx) => idx !== i));
    const updateItem = (i: number, field: string, val: string) => {
      setList(list.map((item, idx) => idx === i ? { ...item, [field]: val } : item));
    };

    return (
      <div style={{ marginTop: '1rem' }}>
        {list.map((item, i) => (
          <div key={i} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 12, padding: '1rem', marginBottom: '0.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <div style={{ fontWeight: 600, fontSize: 13, color: '#374151' }}>Anggota Tim #{i + 1}</div>
              <button onClick={() => removeItem(i)}
                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: 12 }}>
                Hapus
              </button>
            </div>
            {fields.includes('image') && <ImageInput label="Foto Profil" value={item.image || ''} onChange={v => updateItem(i, 'image', v)} />}
            {fields.includes('name') && <TextInput label="Nama Lengkap" value={item.name || ''} onChange={v => updateItem(i, 'name', v)} />}
            {fields.includes('role') && <TextInput label="Jabatan / Posisi" value={item.role || ''} onChange={v => updateItem(i, 'role', v)} />}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={addItem} style={{ padding: '0.55rem 1rem', background: '#F3F4F6', color: '#374151', border: '1.5px dashed #D1D5DB', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            + Tambah Anggota Tim
          </button>
          <button onClick={() => saveSection(sectionName, { [dbKey]: JSON.stringify(list) })} disabled={saving === sectionName}
            style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            {saving === sectionName ? 'Menyimpan...' : 'Simpan Daftar Tim'}
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Memuat...</div>;

  return (
    <div style={{ maxWidth: 800, paddingBottom: '4rem' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: toast.type === 'ok' ? '#111827' : '#DC2626', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 12, fontSize: 14, zIndex: 999 }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Editor Tentang Sekolah</h1>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Ubah profil sekolah, visi misi, daftar guru, dan sambutan kepala sekolah.</p>
      </div>

      <SectionCard title="1. Hero Section" icon="image">
        <ImageInput label="Gambar Latar Hero" value={s('about_hero_image')} onChange={set('about_hero_image')} />
        <TextInput label="Judul Halaman" value={s('about_hero_title')} onChange={set('about_hero_title')} />
        <TextInput label="Subjudul / Deskripsi Pendek" value={s('about_hero_subtitle')} onChange={set('about_hero_subtitle')} textarea rows={2} />
        <button onClick={() => saveSection('hero', { 
          about_hero_image: s('about_hero_image'), about_hero_title: s('about_hero_title'), about_hero_subtitle: s('about_hero_subtitle') 
        })} style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>Simpan Hero</button>
      </SectionCard>

      <div style={{ padding: '1rem', background: '#FEF3C7', color: '#92400E', borderRadius: '12px', marginBottom: '1.25rem', fontSize: '14px', border: '1px solid #FDE68A' }}>
        <strong>Info:</strong> Bagian <strong>Sekilas Tentang Kami</strong> dan <strong>Statistik Sekolah</strong> menggunakan data yang sama dengan pengaturan Homepage. Silakan edit bagian tersebut di menu <em>Editor Homepage</em>.
      </div>

      <SectionCard title="3. Visi & Misi" icon="visibility">
        <TextInput label="Teks Visi" value={s('about_vision')} onChange={set('about_vision')} textarea rows={3} />
        <TextInput label="Teks Misi" value={s('about_mission')} onChange={set('about_mission')} textarea rows={6} />
        <button onClick={() => saveSection('visimisi', { about_vision: s('about_vision'), about_mission: s('about_mission') })} 
        style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>Simpan Visi & Misi</button>
      </SectionCard>

      <SectionCard title="5. Tim Guru & Karyawan" icon="groups">
        {renderListEditor(team, setTeam, ['image', 'name', 'role'], 'team', 'about_team')}
      </SectionCard>

      <SectionCard title="6. Sambutan Kepala Sekolah" icon="record_voice_over">
        <ImageInput label="Foto Kepala Sekolah" value={s('about_principal_image')} onChange={set('about_principal_image')} />
        <TextInput label="Nama Kepala Sekolah & Gelar" value={s('about_principal_name')} onChange={set('about_principal_name')} />
        <TextInput label="Pesan Sambutan" value={s('about_principal_message')} onChange={set('about_principal_message')} textarea rows={8} />
        <button onClick={() => saveSection('principal', { 
          about_principal_image: s('about_principal_image'), about_principal_name: s('about_principal_name'), about_principal_message: s('about_principal_message') 
        })} style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>Simpan Sambutan</button>
      </SectionCard>

    </div>
  );
}
