import { useEffect, useState } from 'react';

const STORAGE_KEY = 'portfolio-cloud-paused';

export function useCloudMotion() {
  const [paused, setPaused] = useState(() => {
    try { return localStorage.getItem(STORAGE_KEY) === 'true'; } catch { return false; }
  });
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => setReducedMotion(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    try { localStorage.setItem(STORAGE_KEY, String(next)); } catch { /* Controls work without storage. */ }
  };
  return { paused, reducedMotion, toggle };
}
