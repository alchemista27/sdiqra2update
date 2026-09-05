'use client';

import { useState, useEffect } from 'react';

export default function CommentsSection({ postId }: { postId: string }) {
  const [comments, setComments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [replyTo, setReplyTo] = useState<string | null>(null);
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState('');

  // We need to count total recursively
  const countComments = (list: any[]): number => {
    return list.reduce((acc, c) => acc + 1 + countComments(c.replies || []), 0);
  };

  useEffect(() => {
    fetch('/api/public/comments/' + postId)
      .then(r => r.json())
      .then(r => { setComments(r.data || []); setLoading(false); })
      .catch(() => setLoading(false));
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const res = await fetch('/api/public/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, parentId: replyTo, authorName: name, authorEmail: email, content })
      });
      if(res.ok) {
        setMsg('Komentar berhasil dikirim dan sedang menunggu moderasi admin.');
        setContent(''); setReplyTo(null);
      } else {
        setMsg('Gagal mengirim komentar.');
      }
    } catch {
      setMsg('Gagal mengirim komentar.');
    }
    setSubmitting(false);
  };

  const renderComment = (c: any, isReply = false) => (
    <div key={c.id} style={{ 
      marginBottom: '1.5rem', 
      paddingLeft: isReply ? '2rem' : '0',
      borderLeft: isReply ? '2px solid var(--color-border)' : 'none',
      marginLeft: isReply ? '1rem' : '0'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
        <div style={{ width: '40px', height: '40px', flexShrink: 0, background: 'var(--color-primary)', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
          {c.authorName.charAt(0).toUpperCase()}
        </div>
        <div>
          <div style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{c.authorName}</div>
          <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>
            {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(c.createdAt))}
          </div>
        </div>
      </div>
      <p style={{ color: '#4B5563', lineHeight: 1.6, marginBottom: '0.5rem', whiteSpace: 'pre-wrap' }}>{c.content}</p>
      <button onClick={() => setReplyTo(c.id)} style={{ background: 'none', border: 'none', color: 'var(--color-secondary)', fontSize: '0.9rem', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
        Balas Komentar
      </button>

      {/* Render replies recursively */}
      {c.replies && c.replies.length > 0 && (
        <div style={{ marginTop: '1.5rem' }}>
          {c.replies.map((reply: any) => renderComment(reply, true))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ marginTop: '3rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Komentar ({countComments(comments)})</h3>
      
      {loading ? <p>Memuat komentar...</p> : comments.length === 0 ? <p style={{ color: '#6B7280', marginBottom: '2rem' }}>Belum ada komentar. Jadilah yang pertama berkomentar!</p> : (
        <div style={{ marginBottom: '3rem' }}>
          {comments.map(c => renderComment(c))}
        </div>
      )}

      <div style={{ background: 'var(--color-surface)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--color-border)' }} id="comment-form">
        <h4 style={{ fontSize: '1.25rem', marginBottom: '1rem' }}>
          {replyTo ? 'Balas Komentar' : 'Tinggalkan Komentar'}
        </h4>
        {replyTo && (
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
            <button onClick={() => setReplyTo(null)} style={{ background: 'none', border: 'none', color: '#DC2626', cursor: 'pointer', fontWeight: 600, padding: 0 }}>
              Batal Balas
            </button>
          </div>
        )}
        
        {msg && <div style={{ padding: '1rem', background: '#D1FAE5', color: '#065F46', borderRadius: '8px', marginBottom: '1.5rem' }}>{msg}</div>}
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <input required type="text" placeholder="Nama Lengkap *" value={name} onChange={e=>setName(e.target.value)} className="input-field" />
            <input required type="email" placeholder="Alamat Email *" value={email} onChange={e=>setEmail(e.target.value)} className="input-field" />
          </div>
          <textarea required placeholder="Tulis komentar Anda di sini..." rows={4} value={content} onChange={e=>setContent(e.target.value)} className="input-field"></textarea>
          <button type="submit" disabled={submitting} className="btn-primary" style={{ alignSelf: 'flex-start', padding: '12px 24px' }}>
            {submitting ? 'Mengirim...' : 'Kirim Komentar'}
          </button>
        </form>
      </div>
    </div>
  );
}
