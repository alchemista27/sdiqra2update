import { AnimatedSection } from '@/components/AnimatedSection';
import CommentsSection from '@/components/CommentsSection';
import { postsApi } from '@/lib/api';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 60;

export default async function SinglePostPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  let post: any = null;
  let latestPosts: any[] = [];
  try {
    const res = await postsApi.getBySlug(params.slug);
    post = res.data;
    const latestRes = await postsApi.getAll({ limit: '5', sort: 'desc' });
    latestPosts = latestRes.data || [];
  } catch (err) {
    console.warn("Backend offline or error fetching post.");
  }

  if (!post) {
    notFound();
  }

  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800';
    return url.startsWith('http') ? url : `${API_BASE}${url}`;
  };

  const publishDate = new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'long', year: 'numeric' }).format(new Date(post.publishedAt || post.createdAt));
  let commentCount = 0;
  try {
    const cRes = await fetch(`${API_BASE}/api/public/comments/${post.id}`, { cache: 'no-store' });
    const cData = await cRes.json();
    const countComments = (list: any[]): number => list.reduce((acc, c) => acc + 1 + countComments(c.replies || []), 0);
    commentCount = countComments(cData.data || []);
  } catch (e) {}

  const shareUrl = `http://localhost:3000/berita/${post.slug}`; // Ideally use real domain from env

  return (
    <>
      <header style={{ background: 'var(--color-surface)', padding: '60px 20px 40px', borderBottom: '1px solid var(--color-border)', textAlign: 'center' }}>
        <AnimatedSection className="container" animation="slide-down">
          {post.category && (
            <span style={{ background: 'var(--color-primary)', color: '#fff', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600, display: 'inline-block', marginBottom: '1rem' }}>
              {post.category.name}
            </span>
          )}
          <h1 style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "var(--color-primary)", maxWidth: '900px', margin: '0 auto 1.5rem auto', lineHeight: 1.3 }}>
            {post.title}
          </h1>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', color: '#6B7280', fontSize: '0.95rem' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span> Oleh {post.author?.name || 'Admin'}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>calendar_today</span> {publishDate}
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>forum</span> <a href="#comment-form" style={{ color: 'inherit', textDecoration: 'none' }}>{commentCount} Komentar</a>
            </span>
          </div>
        </AnimatedSection>
      </header>

      <main className="container" style={{ padding: '60px 20px 80px' }}>
        <div className="single-layout">
          
          {/* Main Article Content */}
          <article>
            <AnimatedSection animation="slide-up">
              <div style={{ borderRadius: '12px', overflow: 'hidden', marginBottom: '2rem' }}>
                <img src={getImageUrl(post.coverImage)} alt={post.title} style={{ width: '100%', height: 'auto', maxHeight: '500px', objectFit: 'cover', display: 'block' }} />
              </div>

              <div className="article-body" dangerouslySetInnerHTML={{ __html: post.content }} style={{ fontSize: '1.1rem', lineHeight: 1.8, color: '#374151' }} />
              
              {/* Share Buttons */}
              <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--color-border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <strong style={{ color: 'var(--color-primary)' }}>Bagikan:</strong>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><i className="icon">facebook</i></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>𝕏</a>
                <a href={`https://wa.me/?text=${encodeURIComponent(post.title + ' ' + shareUrl)}`} target="_blank" rel="noreferrer" className="btn-secondary" style={{ width: '40px', height: '40px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}><i className="icon">chat</i></a>
              </div>

              {/* Author Box */}
              <div style={{ marginTop: '3rem', background: '#F3F4F6', padding: '2rem', borderRadius: '12px', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', flexShrink: 0, borderRadius: '50%', background: 'var(--color-primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '3rem' }}>person</span>
                </div>
                <div>
                  <h4 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--color-primary)' }}>{post.author?.name || 'Administrator'}</h4>
                  <p style={{ color: '#6B7280', margin: 0 }}>Tim redaksi SD Islam Terpadu Iqra 2 Bengkulu. Berkomitmen menyajikan informasi teraktual dan terpercaya.</p>
                </div>
              </div>

              {/* Comments Section */}
              <CommentsSection postId={post.id} />
            </AnimatedSection>
          </article>

          {/* Sidebar */}
          <aside>
            <div style={{ position: 'sticky', top: '20px' }}>
            <AnimatedSection animation="slide-left">
              <div className="sidebar-widget" style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-tertiary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Pencarian</h3>
                <form action="/berita" method="GET" style={{ display: 'flex', gap: '0.5rem' }}>
                  <input type="text" name="q" placeholder="Cari berita..." className="input-field" style={{ flex: 1, padding: '10px' }} />
                  <button type="submit" className="btn-primary" style={{ padding: '10px 14px' }}><span className="material-symbols-outlined">search</span></button>
                </form>
              </div>

              <div className="sidebar-widget" style={{ background: 'var(--color-surface)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: 'var(--color-primary)', borderBottom: '2px solid var(--color-tertiary)', paddingBottom: '0.5rem', display: 'inline-block' }}>Berita Terbaru</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  {latestPosts.slice(0, 5).map(lp => (
                    <Link href={`/berita/${lp.slug}`} key={lp.id} style={{ display: 'flex', gap: '1rem', textDecoration: 'none', color: 'inherit', alignItems: 'center' }}>
                      <div style={{ width: '80px', height: '60px', borderRadius: '8px', overflow: 'hidden', flexShrink: 0 }}>
                        <img src={getImageUrl(lp.coverImage)} alt={lp.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '0.95rem', margin: '0 0 4px 0', lineHeight: 1.4, fontWeight: 600, color: 'var(--color-primary)' }}>{lp.title}</h4>
                        <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>
                          {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(lp.publishedAt || lp.createdAt))}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            </div>
          </aside>
        </div>
      </main>
    </>
  );
}
