'use client';

import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(options: { threshold?: number, triggerOnce?: boolean } = {}) {
  const { threshold = 0.1, triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        if (triggerOnce) {
          observer.unobserve(currentRef);
        }
      } else if (!triggerOnce) {
        setIsVisible(false);
      }
    }, { threshold });

    observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [threshold, triggerOnce]);

  return { ref, isVisible };
}
