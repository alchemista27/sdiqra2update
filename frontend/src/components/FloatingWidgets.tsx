'use client';
import { useState, useEffect, useRef } from 'react';

export function FloatingWidgets({ whatsappNumber }: { whatsappNumber?: string }) {
  const [showScroll, setShowScroll] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [message, setMessage] = useState('');
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkScroll = () => {
      if (!showScroll && window.pageYOffset > 400) {
        setShowScroll(true);
      } else if (showScroll && window.pageYOffset <= 400) {
        setShowScroll(false);
      }
    };
    window.addEventListener('scroll', checkScroll);
    return () => window.removeEventListener('scroll', checkScroll);
  }, [showScroll]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsChatOpen(false);
      }
    };
    if (isChatOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isChatOpen]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSendWA = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const number = whatsappNumber?.replace(/\D/g, '') || '6281234567890';
    const msg = encodeURIComponent(message.trim() || 'Halo Admin SD IT Iqra 2, saya ingin bertanya.');
    window.open(`https://wa.me/${number}?text=${msg}`, '_blank');
    setIsChatOpen(false);
    setMessage('');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', zIndex: 9999, alignItems: 'flex-end' }}>
      
      {/* Live Chat Popover */}
      <div 
        ref={chatRef}
        style={{
          position: 'absolute', bottom: '100%', right: 0, marginBottom: '1rem',
          width: '320px', backgroundColor: '#fff', borderRadius: '16px', overflow: 'hidden',
          boxShadow: '0 8px 32px rgba(0,0,0,0.15)', transformOrigin: 'bottom right',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
          opacity: isChatOpen ? 1 : 0, transform: isChatOpen ? 'scale(1)' : 'scale(0.8)',
          pointerEvents: isChatOpen ? 'auto' : 'none'
        }}>
        
        {/* Header */}
        <div style={{ backgroundColor: '#128C7E', color: 'white', padding: '1rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ color: '#128C7E', fontSize: 24 }}>support_agent</span>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>CS SD IT Iqra 2</h3>
            <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.9 }}>Biasanya membalas dalam beberapa jam</p>
          </div>
          <button onClick={() => setIsChatOpen(false)} style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'white', cursor: 'pointer' }}>
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Chat Body */}
        <div style={{ padding: '1rem', backgroundColor: '#E5DDD5', backgroundImage: 'url("https://w0.peakpx.com/wallpaper/818/148/HD-wallpaper-whatsapp-background-cool-dark-green-light-pattern-soft-whatsapp.jpg")', backgroundSize: 'cover', minHeight: '160px', display: 'flex', flexDirection: 'column' }}>
          <div style={{ backgroundColor: '#fff', padding: '0.5rem 0.75rem', borderRadius: '0px 12px 12px 12px', maxWidth: '85%', fontSize: '0.875rem', color: '#111827', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
            Assalamu'alaikum! Ada yang bisa kami bantu terkait informasi sekolah atau PPDB?
          </div>
        </div>

        {/* Chat Input */}
        <form onSubmit={handleSendWA} style={{ padding: '0.75rem', backgroundColor: '#F0F2F5', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <input
            type="text"
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Ketik pesan Anda..."
            autoFocus={isChatOpen}
            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '24px', border: 'none', outline: 'none', fontSize: '0.875rem', backgroundColor: '#fff' }}
          />
          <button type="submit" style={{ width: 40, height: 40, borderRadius: '50%', backgroundColor: '#128C7E', color: 'white', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>send</span>
          </button>
        </form>
      </div>

      {/* Back to Top */}
      <button 
        onClick={scrollToTop}
        title="Kembali ke Atas"
        style={{
          width: 44, height: 44, borderRadius: '50%', backgroundColor: 'var(--color-surface)', color: 'var(--color-primary)',
          border: '1px solid var(--color-border)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.1)', transition: 'all 0.3s ease',
          opacity: showScroll ? 1 : 0, transform: showScroll ? 'translateY(0)' : 'translateY(20px)', pointerEvents: showScroll ? 'auto' : 'none'
        }}>
        <span className="material-symbols-outlined">arrow_upward</span>
      </button>

      {/* WhatsApp Button */}
      <button
        onClick={() => setIsChatOpen(!isChatOpen)}
        title="Chat WhatsApp CS"
        className={isChatOpen ? '' : 'wa-pulse-button'}
        style={{
          width: 60, height: 60, borderRadius: '50%', backgroundColor: '#25D366', color: 'white',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)', transition: 'all 0.3s ease'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="currentColor" viewBox="0 0 16 16">
          <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"/>
        </svg>
      </button>

      <style dangerouslySetInnerHTML={{__html:`
        @keyframes pulse-wa {
          0% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0.7); }
          70% { box-shadow: 0 0 0 15px rgba(37, 211, 102, 0); }
          100% { box-shadow: 0 0 0 0 rgba(37, 211, 102, 0); }
        }
        .wa-pulse-button {
          animation: pulse-wa 2s infinite;
        }
        .wa-pulse-button:hover {
          transform: scale(1.1);
        }
      `}} />
    </div>
  );
}
