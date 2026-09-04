'use client';
import { useState, useRef, useEffect } from 'react';
import EditPasswordModal from './EditPasswordModal';

interface ProfileMenuProps {
  user: { name?: string; email?: string; role?: string } | null;
  onLogout: () => void;
  /** 'dark' for dark backgrounds (e.g. green header), 'light' for white backgrounds (e.g. admin top bar) */
  variant?: 'dark' | 'light';
}

export default function ProfileMenu({ user, onLogout, variant = 'light' }: ProfileMenuProps) {
  const isDark = variant === 'dark';
  const [open, setOpen] = useState(false);
  const [editPwOpen, setEditPwOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase()
    : 'U';

  return (
    <>
      <div ref={menuRef} style={{ position: 'relative' }}>
        <button
          onClick={() => setOpen(!open)}
          style={{
            display: 'flex', alignItems: 'center', gap: '0.5rem',
            background: isDark ? 'rgba(255,255,255,0.1)' : 'var(--color-neutral)',
            border: isDark ? '1px solid rgba(255,255,255,0.15)' : '1px solid var(--color-border)',
            borderRadius: '50%', padding: '0.35rem 0.75rem 0.35rem 0.35rem',
            cursor: 'pointer', transition: 'all 0.15s',
            color: isDark ? '#fff' : 'var(--color-primary)',
          }}
          onMouseEnter={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.18)' : 'var(--color-border)'}
          onMouseLeave={e => e.currentTarget.style.background = isDark ? 'rgba(255,255,255,0.1)' : 'var(--color-neutral)'}
        >
          <div style={{
            width: 32, height: 32, borderRadius: '50%',
            background: 'var(--color-primary)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontWeight: 800, fontSize: 12, color: '#fff',
          }}>
            <span className="material-symbols-outlined" style={{ fontSize: 20 }}>person</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 600, maxWidth: 120, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
            {user?.name || 'User'}
          </span>
          <span className="material-symbols-outlined" style={{
            fontSize: 18, transition: 'transform 0.2s',
            transform: open ? 'rotate(180deg)' : 'rotate(0)',
          }}>expand_more</span>
        </button>
        {open && (
          <div className="dropdown-animate-in" style={{
            position: 'absolute', right: 0, top: 'calc(100% + 8px)',
            background: '#fff', borderRadius: '50%', minWidth: 240,
            zIndex: 100, overflow: 'hidden',
          }}>
            <div style={{ padding: '1rem 1rem 0.75rem', borderBottom: '1px solid #F3F4F6' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: 40, height: 40, borderRadius: '50%',
                  background: 'var(--color-primary)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 800, fontSize: 14, color: '#fff', flexShrink: 0,
                }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 24 }}>person</span>
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.name || 'User'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--color-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {user?.email || ''}
                  </div>
                  {user?.role && (
                    <div style={{
                      display: 'inline-block', marginTop: 4,
                      padding: '0.1rem 0.5rem', borderRadius: '50%',
                      background: '#D1FAE5', color: '#065F46',
                      fontSize: 10, fontWeight: 700,
                    }}>
                      {user.role.replace(/_/g, ' ')}
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div style={{ padding: '0.4rem' }}>
              <button
                onClick={() => { setOpen(false); setEditPwOpen(true); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.6rem 0.75rem', borderRadius: '50%', border: 'none',
                  background: 'transparent', cursor: 'pointer', fontSize: 13,
                  color: 'var(--color-primary)', fontWeight: 500, transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--color-neutral)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: 'var(--color-primary)' }}>lock</span>
                Edit Password
              </button>

              <div style={{ height: 1, background: 'var(--color-neutral)', margin: '0.25rem 0.5rem' }} />

              <button
                onClick={() => { setOpen(false); onLogout(); }}
                style={{
                  width: '100%', display: 'flex', alignItems: 'center', gap: '0.6rem',
                  padding: '0.6rem 0.75rem', borderRadius: '50%', border: 'none',
                  background: 'transparent', cursor: 'pointer', fontSize: 13,
                  color: '#DC2626', fontWeight: 500, transition: 'background 0.1s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#FEF2F2'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <span className="material-symbols-outlined" style={{ fontSize: 18, color: '#DC2626' }}>logout</span>
                Keluar
              </button>
            </div>
          </div>
        )}
      </div>
      <EditPasswordModal open={editPwOpen} onClose={() => setEditPwOpen(false)} />
    </>
  );
}
