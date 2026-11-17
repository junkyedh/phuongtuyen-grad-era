'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import MusicPlayer, { type MusicHandle } from './MusicPlayer';
import SunflowerReveal, { type RevealPhase } from './SunflowerReveal';
import FloatingPetals from './FloatingPetals';

export default function InvitationExperience({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<RevealPhase>('closed');
  const mainRef = useRef<HTMLElement>(null);
  const musicRef = useRef<MusicHandle>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    [],
  );

  useEffect(() => {
    if (phase === 'open') mainRef.current?.focus({ preventScroll: true });
  }, [phase]);

  useEffect(() => {
    if (phase !== 'open' || !mainRef.current) return;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (reducedMotion.matches || typeof IntersectionObserver === 'undefined') return;

    const elements = Array.from(mainRef.current.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          (target as HTMLElement).dataset.revealState = 'visible';
          observer.unobserve(target);
        });
      },
      { threshold: 0.12 },
    );

    elements.forEach((element) => {
      element.dataset.revealState = 'pending';
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
      elements.forEach((element) => delete element.dataset.revealState);
    };
  }, [phase]);

  function bloom() {
    if (phase !== 'closed') return;

    musicRef.current?.startFromGesture();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setPhase('open');
      return;
    }

    setPhase('blooming');
    timerRef.current = setTimeout(() => setPhase('open'), 2050);
  }

  return (
    <div className="invitation-experience" data-phase={phase}>
      <main
        ref={mainRef}
        className="invitation-content"
        aria-label="Lời mời tốt nghiệp"
        aria-hidden={phase !== 'open'}
        inert={phase !== 'open'}
        tabIndex={-1}
      >
        {children}
      </main>
      {phase !== 'open' && <SunflowerReveal phase={phase} onBloom={bloom} />}
      <FloatingPetals />
      <MusicPlayer ref={musicRef} />
    </div>
  );
}
