'use client';
import { useEffect, useState } from 'react';
import { settingsApi } from '@/lib/api';
import { getToken } from '@/lib/auth';
import { ImageInput } from '@/components/admin/MediaPickerModal';

interface GenericItem { icon?: string; title?: string; desc?: string; image?: string; value?: string; label?: string }
type Settings = Record<string, string>

const MATERIAL_ICONS_SUGGESTIONS = [
  'school', 'person', 'emoji_events', 'menu_book', 'science', 'sports_soccer',
  'family_restroom', 'mosque', 'auto_stories', 'psychology', 'diversity_3',
  'volunteer_activism', 'star', 'workspace_premium', 'military_tech', 'language',
  'verified_user', 'groups', 'eco', 'apartment'
];

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

function IconPicker({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div style={{ marginBottom: '0.75rem' }}>
      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#6B7280', marginBottom: '0.3rem' }}>Ikon Material Symbols</label>
      <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.4rem' }}>
        {MATERIAL_ICONS_SUGGESTIONS.map(icon => (
          <button key={icon} type="button" onClick={() => onChange(icon)}
            title={icon}
            style={{ width: 36, height: 36, background: value === icon ? '#1B6B44' : '#F3F4F6', color: value === icon ? '#fff' : '#374151', border: 'none', borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.1s' }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>{icon}</span>
          </button>
        ))}
      </div>
      <input value={value || ''} onChange={e => onChange(e.target.value)} placeholder="Nama ikon custom..." style={{ width: '100%', padding: '0.5rem 0.75rem', border: '1.5px solid #E5E7EB', borderRadius: 8, fontSize: 13, fontFamily: 'monospace', boxSizing: 'border-box' as const }} />
    </div>
  );
}

export default function AdminHomepageEditorPage() {
  const [settings, setSettings] = useState<Settings>({});
  
  // JSON arrays
  const [values, setValues] = useState<GenericItem[]>([]);
  const [stats, setStats] = useState<GenericItem[]>([]);
  const [features, setFeatures] = useState<GenericItem[]>([]);
  const [programs, setPrograms] = useState<GenericItem[]>([]);
  const [whyus, setWhyus] = useState<GenericItem[]>([]);
  const [facilities, setFacilities] = useState<GenericItem[]>([]);

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
      
      setValues(parse('homepage_values'));
      setStats(parse('homepage_stats'));
      setFeatures(parse('homepage_features'));
      setPrograms(parse('homepage_programs'));
      setWhyus(parse('homepage_whyus'));
      setFacilities(parse('homepage_facilities'));
      
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const s = (key: string) => settings[key] || '';
  const set = (key: string) => (val: string) => setSettings(prev => ({ ...prev, [key]: val }));

  const saveSection = async (section: string, payload: Record<string, string>) => {
    setSaving(section);
    try {
      await settingsApi.updateMany(getToken()!, payload);
      showToast('✅ Berhasil disimpan!');
    } catch { showToast('❌ Gagal menyimpan.', 'err'); }
    setSaving(null);
  };

  // Helper for Lists
  const renderListEditor = (
    list: GenericItem[], 
    setList: React.Dispatch<React.SetStateAction<GenericItem[]>>, 
    fields: ('icon'|'title'|'desc'|'image'|'value'|'label')[],
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
              <div style={{ fontWeight: 600, fontSize: 13, color: '#374151' }}>Item #{i + 1}</div>
              <button onClick={() => removeItem(i)}
                style={{ background: '#FEE2E2', color: '#DC2626', border: 'none', borderRadius: 6, padding: '0.25rem 0.5rem', cursor: 'pointer', fontSize: 12 }}>
                Hapus
              </button>
            </div>
            {fields.includes('icon') && <IconPicker value={item.icon || ''} onChange={v => updateItem(i, 'icon', v)} />}
            {fields.includes('image') && <ImageInput label="Gambar Fasilitas" value={item.image || ''} onChange={v => updateItem(i, 'image', v)} />}
            {fields.includes('value') && <TextInput label="Angka/Nilai" value={item.value || ''} onChange={v => updateItem(i, 'value', v)} />}
            {fields.includes('label') && <TextInput label="Label" value={item.label || ''} onChange={v => updateItem(i, 'label', v)} />}
            {fields.includes('title') && <TextInput label="Judul" value={item.title || ''} onChange={v => updateItem(i, 'title', v)} />}
            {fields.includes('desc') && <TextInput label="Deskripsi" value={item.desc || ''} onChange={v => updateItem(i, 'desc', v)} textarea rows={2} />}
          </div>
        ))}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '1rem' }}>
          <button onClick={addItem} style={{ padding: '0.55rem 1rem', background: '#F3F4F6', color: '#374151', border: '1.5px dashed #D1D5DB', borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: 'pointer' }}>
            + Tambah Item
          </button>
          <button onClick={() => saveSection(sectionName, { [dbKey]: JSON.stringify(list) })} disabled={saving === sectionName}
            style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14 }}>
            {saving === sectionName ? 'Menyimpan...' : 'Simpan Daftar'}
          </button>
        </div>
      </div>
    );
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div style={{ maxWidth: 800, paddingBottom: '4rem' }}>
      {toast && (
        <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', background: toast.type === 'ok' ? '#111827' : '#DC2626', color: '#fff', padding: '0.75rem 1.25rem', borderRadius: 12, fontSize: 14, zIndex: 999 }}>
          {toast.msg}
        </div>
      )}

      <div style={{ marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: 20, fontWeight: 800 }}>Editor Homepage Lengkap</h1>
        <p style={{ fontSize: 14, color: '#6B7280' }}>Ubah seluruh konten halaman utama secara dinamis.</p>
      </div>

      <SectionCard title="1. Hero Section" icon="image">
        <ImageInput label="Gambar Latar Hero" value={s('hero_image')} onChange={set('hero_image')} />
        <TextInput label="Judul Hero" value={s('hero_title')} onChange={set('hero_title')} />
        <TextInput label="Subjudul / Deskripsi" value={s('hero_subtitle')} onChange={set('hero_subtitle')} textarea rows={3} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
          <TextInput label="Tombol 1 Teks" value={s('hero_cta_primary_text')} onChange={set('hero_cta_primary_text')} />
          <TextInput label="Tombol 1 URL" value={s('hero_cta_primary_url')} onChange={set('hero_cta_primary_url')} />
          <TextInput label="Tombol 2 Teks" value={s('hero_cta_secondary_text')} onChange={set('hero_cta_secondary_text')} />
          <TextInput label="Tombol 2 URL" value={s('hero_cta_secondary_url')} onChange={set('hero_cta_secondary_url')} />
        </div>
        <button onClick={() => saveSection('hero', { 
          hero_image: s('hero_image'), hero_title: s('hero_title'), hero_subtitle: s('hero_subtitle'), 
          hero_cta_primary_text: s('hero_cta_primary_text'), hero_cta_primary_url: s('hero_cta_primary_url'),
          hero_cta_secondary_text: s('hero_cta_secondary_text'), hero_cta_secondary_url: s('hero_cta_secondary_url')
        })} style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>Simpan Hero</button>
      </SectionCard>

      <SectionCard title="2. School Value (Highlight Boxes)" icon="view_column">
        {renderListEditor(values, setValues, ['icon', 'title', 'desc'], 'values', 'homepage_values')}
      </SectionCard>

      <SectionCard title="3. Sekilas Tentang Kami (About)" icon="info">
        <TextInput label="Judul" value={s('about_title')} onChange={set('about_title')} />
        <TextInput label="Paragraf 1" value={s('about_desc1')} onChange={set('about_desc1')} textarea rows={3} />
        <TextInput label="Paragraf 2" value={s('about_desc2')} onChange={set('about_desc2')} textarea rows={3} />
        <ImageInput label="Gambar About" value={s('about_image')} onChange={set('about_image')} />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
          <TextInput label="Teks Tombol" value={s('about_button_text')} onChange={set('about_button_text')} />
          <TextInput label="URL Tombol" value={s('about_button_url')} onChange={set('about_button_url')} />
        </div>
        <button onClick={() => saveSection('about', { 
          about_title: s('about_title'), about_desc1: s('about_desc1'), about_desc2: s('about_desc2'), 
          about_image: s('about_image'), about_button_text: s('about_button_text'), about_button_url: s('about_button_url')
        })} style={{ padding: '0.65rem 1.5rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 14, width: '100%' }}>Simpan About</button>
      </SectionCard>

      <SectionCard title="4. School Stats" icon="bar_chart">
        <ImageInput label="Gambar Latar Stats" value={s('stats_image')} onChange={set('stats_image')} />
        <button onClick={() => saveSection('stats_bg', { stats_image: s('stats_image') })} style={{ padding: '0.5rem 1rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13, marginBottom: '1rem' }}>Simpan Background</button>
        {renderListEditor(stats, setStats, ['value', 'label'], 'stats', 'homepage_stats')}
      </SectionCard>

      <SectionCard title="5. Keunggulan Kami" icon="workspace_premium">
        <TextInput label="Judul Section" value={s('features_title')} onChange={set('features_title')} />
        <button onClick={() => saveSection('features_title', { features_title: s('features_title') })} style={{ padding: '0.5rem 1rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13, marginBottom: '1rem' }}>Simpan Judul</button>
        {renderListEditor(features, setFeatures, ['icon', 'title', 'desc'], 'features', 'homepage_features')}
      </SectionCard>

      <SectionCard title="6. Program Unggulan" icon="school">
        <TextInput label="Judul Section" value={s('programs_title')} onChange={set('programs_title')} />
        <button onClick={() => saveSection('programs_title', { programs_title: s('programs_title') })} style={{ padding: '0.5rem 1rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13, marginBottom: '1rem' }}>Simpan Judul</button>
        {renderListEditor(programs, setPrograms, ['icon', 'title', 'desc'], 'programs', 'homepage_programs')}
      </SectionCard>

      <SectionCard title="7. Mengapa Memilih Kami" icon="favorite">
        <TextInput label="Judul" value={s('why_title')} onChange={set('why_title')} />
        <TextInput label="Paragraf Pembuka" value={s('why_desc')} onChange={set('why_desc')} textarea rows={2} />
        <ImageInput label="Gambar Samping" value={s('why_image')} onChange={set('why_image')} />
        <button onClick={() => saveSection('why_intro', { why_title: s('why_title'), why_desc: s('why_desc'), why_image: s('why_image') })} style={{ padding: '0.5rem 1rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13, marginBottom: '1rem' }}>Simpan Intro</button>
        {renderListEditor(whyus, setWhyus, ['icon', 'title', 'desc'], 'whyus', 'homepage_whyus')}
      </SectionCard>

      <SectionCard title="8. Fasilitas Terbaik" icon="apartment">
        <TextInput label="Judul Section" value={s('facilities_title')} onChange={set('facilities_title')} />
        <button onClick={() => saveSection('facilities_title', { facilities_title: s('facilities_title') })} style={{ padding: '0.5rem 1rem', background: '#1B6B44', color: '#fff', border: 'none', borderRadius: 10, fontWeight: 700, cursor: 'pointer', fontSize: 13, marginBottom: '1rem' }}>Simpan Judul</button>
        {renderListEditor(facilities, setFacilities, ['image', 'title'], 'facilities', 'homepage_facilities')}
      </SectionCard>

    </div>
  );
}
