'use client';
import { useEffect, useState } from 'react';
import { fetcher, API_URL } from '@/lib/api';
import { getToken } from '@/lib/auth';



export default function AdminCommentsPage() {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadComments = () => {
    setLoading(true);
    fetcher<{ data: any[] }>('/cms/comments?limit=50', {
      headers: { Authorization: `Bearer ${getToken()}` }
    }).then(r => {
      setComments(r.data || []);
      setLoading(false);
    }).catch(() => setLoading(false));
  };

  useEffect(() => { loadComments(); }, []);

  const updateStatus = async (id: string, status: string) => {
    await fetch(`${API_URL}/cms/comments/${id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${getToken()}` },
      body: JSON.stringify({ status })
    });
    loadComments();
  };

  const deleteComment = async (id: string) => {
    if(!confirm('Hapus komentar ini?')) return;
    await fetch(`${API_URL}/cms/comments/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${getToken()}` }
    });
    loadComments();
  };

  if (loading) return <div style={{ padding: '2rem' }}>Memuat komentar...</div>;

  return (
    <div style={{ maxWidth: 900, paddingBottom: '4rem' }}>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: '1.5rem' }}>Moderasi Komentar</h1>
      
      {comments.length === 0 ? <p>Belum ada komentar.</p> : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {comments.map(c => (
            <div key={c.id} style={{ background: '#fff', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
                <div>
                  <strong>{c.authorName}</strong> {c.authorEmail && <span style={{ color: '#6B7280', fontSize: '0.9rem' }}>({c.authorEmail})</span>}
                  <div style={{ fontSize: '0.85rem', color: '#9CA3AF', marginTop: '0.25rem' }}>
                    Di artikel: <span style={{ color: 'var(--color-primary)' }}>{c.post?.title}</span> • {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(c.createdAt))}
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
                  {c.status === 'PENDING' && (
                    <button onClick={() => updateStatus(c.id, 'APPROVED')} className="btn-primary" style={{ padding: '6px 12px', fontSize: '13px' }}>Setujui</button>
                  )}
                  {c.status === 'APPROVED' && (
                    <span style={{ padding: '6px 12px', fontSize: '13px', background: '#D1FAE5', color: '#065F46', borderRadius: '4px', fontWeight: 600 }}>Disetujui</span>
                  )}
                  <button onClick={() => deleteComment(c.id)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '13px', borderColor: '#FCA5A5', color: '#DC2626' }}>Hapus</button>
                </div>
              </div>
              <p style={{ margin: 0, color: '#374151', whiteSpace: 'pre-wrap' }}>{c.content}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
