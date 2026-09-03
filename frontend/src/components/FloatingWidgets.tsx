'use client';
import { useState, useEffect } from 'react';

export function FloatingWidgets({ whatsappNumber }: { whatsappNumber?: string }) {
  const [showScroll, setShowScroll] = useState(false);

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const number = whatsappNumber?.replace(/\D/g, '') || '6281234567890';
    const message = encodeURIComponent('Halo Admin SD IT Iqra 2, saya ingin bertanya tentang informasi sekolah/PPDB.');
    window.open(`https://wa.me/${number}?text=${message}`, '_blank');
  };

  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', display: 'flex', flexDirection: 'column', gap: '0.8rem', zIndex: 9999, alignItems: 'flex-end' }}>
      
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

      {/* WhatsApp */}
      <button
        onClick={openWhatsApp}
        title="Chat WhatsApp CS"
        className="wa-pulse-button"
        style={{
          width: 56, height: 56, borderRadius: '50%', backgroundColor: '#25D366', color: 'white',
          border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 16px rgba(37, 211, 102, 0.4)', transition: 'all 0.3s ease'
        }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" viewBox="0 0 16 16">
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
