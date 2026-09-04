import Link from "next/link";
import { AnimatedSection } from '@/components/AnimatedSection';
import { postsApi } from '@/lib/api';



export const revalidate = 60;

export default async function BeritaPage(props: { searchParams: Promise<{ [key: string]: string | string[] | undefined }> }) {
  const searchParams = await props.searchParams;
  const page = parseInt((searchParams.page as string) || '1', 10);
  
  let posts: any[] = [];
  let pagination: any = null;
  let heroImage = 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=1920';

  try {
    const res = await postsApi.getAll({ limit: '9', page: String(page) });
    posts = res.data || [];
    pagination = res.pagination;

    // Fetch the absolute latest post separately to always ensure the Hero uses the latest image
    const latestRes = await postsApi.getAll({ limit: '1' });
    if (latestRes.data?.[0]?.coverImage) {
      heroImage = latestRes.data[0].coverImage;
    }
  } catch (err) {
    console.warn("Backend offline or error fetching posts.");
  }

  const renderPagination = () => {
    if (!pagination || pagination.total <= 9) return null;
    const totalPages = pagination.totalPages || Math.ceil(pagination.total / 9);
    
    const pages = [];
    for(let i=1; i<=totalPages; i++) {
       pages.push(
         <Link key={i} href={`/berita?page=${i}`} style={{ 
           display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
           width: '36px', height: '36px',
           border: '1px solid var(--color-border)', borderRadius: '4px', margin: '0 4px',
           backgroundColor: page === i ? 'var(--color-primary)' : 'var(--color-surface)',
           color: page === i ? '#fff' : 'var(--color-primary)',
           textDecoration: 'none', fontWeight: 600
         }}>
           {i}
         </Link>
       )
    }

    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
        {pages}
      </div>
    );
  };

  const API_BASE = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
  const getImageUrl = (url: string) => {
    if (!url) return 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800';
    return url.startsWith('http') ? url : `${API_BASE}${url}`;
  };

  return (
    <>
      <header className="page-header" style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url('${getImageUrl(heroImage)}')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <AnimatedSection className="container" animation="slide-down">
          <h1 style={{ color: 'white', marginBottom: '10px' }}>Berita &amp; Pengumuman</h1>
          <div className="breadcrumb" style={{ color: 'rgba(255,255,255,0.8)' }}>Beranda / Berita</div>
        </AnimatedSection>
      </header>

      <main className="container" style={{ padding: '60px 20px 80px 20px' }}>
        <div className="news-grid">
          {posts.map((post) => (
            <AnimatedSection key={post.id} animation="slide-up">
              <Link href={`/berita/${post.slug}`} className="news-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="news-image-wrapper" style={{ flexShrink: 0, height: '220px' }}>
                  <img src={getImageUrl(post.coverImage)} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  {post.category && <span className="news-badge">{post.category.name}</span>}
                </div>
                <div className="news-content" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '1.5rem' }}>
                  <h2 className="news-title" style={{ flex: 1, fontSize: '1.1rem', marginBottom: '1rem', lineHeight: 1.4 }}>{post.title}</h2>
                  <div className="news-meta" style={{ marginTop: 'auto', display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.85rem', color: '#6B7280' }}>
                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>calendar_today</span> {new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }).format(new Date(post.publishedAt || post.createdAt))}</span>
                    <span className="meta-item" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><span className="material-symbols-outlined" style={{ fontSize: '16px' }}>forum</span> 0 Komentar</span>
                  </div>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
        
        {posts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: '#6B7280' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', marginBottom: '1rem' }}>article</span>
            <p>Belum ada berita yang diterbitkan.</p>
          </div>
        )}

        {renderPagination()}
      </main>
    </>
  );
}
