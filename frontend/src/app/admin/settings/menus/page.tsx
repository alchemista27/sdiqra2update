'use client';
import { useState, useEffect } from 'react';
import { menuApi, MenuItem } from '@/lib/api';
import { getToken } from '@/lib/auth';

export default function MenusAdminPage() {
  const [menus, setMenus] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  
  const [isEditing, setIsEditing] = useState<MenuItem | null>(null);
  const [formData, setFormData] = useState<Partial<MenuItem>>({ label: '', url: '', openInNewTab: false, parentId: null });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const res = await menuApi.getAll();
      setMenus(res.data || []);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = getToken()!;
      if (isEditing && isEditing.id) {
        await menuApi.update(token, isEditing.id, formData);
      } else {
        await menuApi.create(token, formData);
      }
      setIsEditing(null);
      setFormData({ label: '', url: '', openInNewTab: false, parentId: null });
      await fetchMenus();
    } catch (e) {
      alert('Gagal menyimpan menu');
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Hapus menu ini?')) return;
    try {
      await menuApi.remove(getToken()!, id);
      await fetchMenus();
    } catch {
      alert('Gagal menghapus');
    }
  };

  const renderMenuItems = (items: MenuItem[], level = 0) => {
    return items.map((item) => (
      <div key={item.id} style={{ marginLeft: level * 20, marginBottom: 10, padding: 10, border: '1px solid #ddd', borderRadius: 8, background: '#fff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <strong>{item.label}</strong> <span style={{ color: '#666', fontSize: 14 }}>({item.url})</span>
            {item.openInNewTab && <span style={{ marginLeft: 10, fontSize: 12, background: '#eee', padding: '2px 6px', borderRadius: 4 }}>New Tab</span>}
          </div>
          <div>
            <button onClick={() => { setIsEditing(item); setFormData(item); }} style={{ marginRight: 10, background: '#f3f4f6', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Edit</button>
            <button onClick={() => handleDelete(item.id)} style={{ background: '#fee2e2', color: '#dc2626', border: 'none', padding: '5px 10px', borderRadius: 4, cursor: 'pointer' }}>Hapus</button>
          </div>
        </div>
        {item.children && item.children.length > 0 && (
          <div style={{ marginTop: 10 }}>
            {renderMenuItems(item.children, level + 1)}
          </div>
        )}
      </div>
    ));
  };

  if (loading) return <div>Memuat...</div>;

  return (
    <div>
      <h1 style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Manajemen Menu Navigasi</h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: 20 }}>
        <div>
          {menus.length === 0 ? <p>Belum ada menu.</p> : renderMenuItems(menus)}
        </div>

        <div style={{ background: '#f9fafb', padding: 20, borderRadius: 8, border: '1px solid #e5e7eb', alignSelf: 'start' }}>
          <h3>{isEditing ? 'Edit Menu' : 'Tambah Menu Baru'}</h3>
          <form onSubmit={handleSave} style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 5 }}>Label Menu</label>
              <input type="text" required value={formData.label} onChange={e => setFormData({...formData, label: e.target.value})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 5 }}>URL / Link</label>
              <input type="text" required value={formData.url} onChange={e => setFormData({...formData, url: e.target.value})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }} placeholder="Misal: /berita atau https://..." />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: 14, marginBottom: 5 }}>Induk Menu (Parent)</label>
              <select value={formData.parentId || ''} onChange={e => setFormData({...formData, parentId: e.target.value || null})} style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}>
                <option value="">-- Menu Utama --</option>
                {menus.map(m => (
                  <option key={m.id} value={m.id}>{m.label}</option>
                ))}
              </select>
            </div>
            <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 14 }}>
              <input type="checkbox" checked={formData.openInNewTab} onChange={e => setFormData({...formData, openInNewTab: e.target.checked})} />
              Buka di Tab Baru
            </label>
            <div style={{ display: 'flex', gap: 10 }}>
              <button type="submit" disabled={saving} style={{ flex: 1, background: '#1b6b44', color: '#fff', border: 'none', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                {saving ? 'Menyimpan...' : 'Simpan'}
              </button>
              {isEditing && (
                <button type="button" onClick={() => { setIsEditing(null); setFormData({ label: '', url: '', openInNewTab: false, parentId: null }); }} style={{ background: '#ccc', border: 'none', padding: 10, borderRadius: 4, cursor: 'pointer' }}>
                  Batal
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
