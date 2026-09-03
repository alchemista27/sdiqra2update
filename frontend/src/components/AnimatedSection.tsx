'use client';
import { useScrollAnimation } from '@/hooks/useIntersectionObserver';

export function AnimatedSection({ children, className = '', animation = 'slide-up' }: { children: React.ReactNode, className?: string, animation?: string }) {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });
  return (
    <div ref={ref} className={`${className} animate-on-scroll ${animation} ${isVisible ? 'is-visible' : ''}`}>
      {children}
    </div>
  );
}
