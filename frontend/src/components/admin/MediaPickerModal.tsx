'use client';
import { useState, useEffect, useRef } from 'react';
import { mediaApi, type CloudinaryMedia } from '@/lib/api';
import { getToken } from '@/lib/auth';

interface MediaPickerModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export function MediaPickerModal({ isOpen, onClose, onSelect }: MediaPickerModalProps) {
  const [media, setMedia] = useState<CloudinaryMedia[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    setLoading(true);
    mediaApi.getAll(getToken()!, { limit: '50' })
      .then(res => setMedia(res.data || []))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, [isOpen]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    setUploading(true);
    try {
      const file = files[0];
      await mediaApi.upload(getToken()!, file, 'media');
      
      // Refresh list
      const res = await mediaApi.getAll(getToken()!, { limit: '50' });
      setMedia(res.data || []);
    } catch (err) {
      alert('Gagal mengunggah gambar.');
    }
    setUploading(false);
  };

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 9999,
      background: 'rgba(0,0,0,0.5)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', padding: '1rem'
    }}>
      <div style={{
        background: '#fff', borderRadius: 16, width: '100%', maxWidth: 800,
        maxHeight: '85vh', display: 'flex', flexDirection: 'column', overflow: 'hidden'
      }}>
        {/* Header */}
        <div style={{ padding: '1rem 1.5rem', borderBottom: '1px solid var(--color-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, margin: 0 }}>Pilih Gambar dari Media Library</h2>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            <span className="material-symbols-outlined" style={{ color: '#6B7280' }}>close</span>
          </button>
        </div>

        {/* Toolbar */}
        <div style={{ padding: '1rem 1.5rem', background: '#F9FAFB', borderBottom: '1px solid var(--color-border)' }}>
          <button onClick={() => fileRef.current?.click()} disabled={uploading}
            style={{
              padding: '0.6rem 1.2rem', background: '#1B6B44', color: '#fff', border: 'none',
              borderRadius: 8, fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.4rem'
            }}>
            <span className="material-symbols-outlined" style={{ fontSize: 18 }}>{uploading ? 'sync' : 'upload'}</span>
            {uploading ? 'Mengunggah...' : 'Upload Gambar Baru'}
          </button>
          <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*" style={{ display: 'none' }} />
        </div>

        {/* Content */}
        <div style={{ padding: '1.5rem', overflowY: 'auto', flex: 1, background: '#F3F4F6' }}>
          {loading ? (
            <div style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>Memuat media...</div>
          ) : media.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>Belum ada media. Silakan upload gambar pertama.</div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '1rem' }}>
              {media.map((m) => (
                <div key={m.publicId} onClick={() => { onSelect(m.url); onClose(); }}
                  style={{
                    background: '#fff', border: '1px solid var(--color-border)', borderRadius: 8, overflow: 'hidden',
                    cursor: 'pointer', position: 'relative', aspectRatio: '1'
                  }}>
                  <img src={m.url} alt={m.publicId} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ImageInput({ label, value, onChange }: { label: string; value: string; onChange: (url: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: '0.4rem' }}>{label}</label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
        <div
          onClick={() => setIsOpen(true)}
          style={{
            width: 60, height: 60, flexShrink: 0, border: '1.5px dashed #D1D5DB', borderRadius: 8,
            overflow: 'hidden', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: value ? '#fff' : '#F9FAFB'
          }}
          title="Klik untuk ganti gambar"
        >
          {value ? (
            <img src={value} alt="Preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span className="material-symbols-outlined" style={{ color: '#9CA3AF' }}>image</span>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <input
            value={value || ''} onChange={e => onChange(e.target.value)}
            placeholder="URL Gambar (atau klik tombol/preview untuk pilih)"
            style={{ width: '100%', padding: '0.55rem 0.75rem', border: '1px solid var(--color-border)', borderRadius: 8, fontSize: 13, boxSizing: 'border-box' }}
          />
          <button type="button" onClick={() => setIsOpen(true)}
            style={{
              marginTop: '0.4rem', padding: '0.35rem 0.75rem', background: '#F3F4F6', color: '#374151',
              border: '1px solid #D1D5DB', borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: '0.2rem'
            }}>
            <span className="material-symbols-outlined" style={{ fontSize: 14 }}>photo_library</span>
            Pilih dari Media Library
          </button>
        </div>
      </div>
      <MediaPickerModal isOpen={isOpen} onClose={() => setIsOpen(false)} onSelect={onChange} />
    </div>
  );
}
