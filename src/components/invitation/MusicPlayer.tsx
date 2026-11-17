'use client';

import { useCallback, useImperativeHandle, useRef, useState, type Ref } from 'react';
import { event } from '@/data/event';
import { siteContent } from '@/data/content';

export type MusicHandle = {
  startFromGesture: () => void;
};

export default function MusicPlayer({ ref }: { ref: Ref<MusicHandle> }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !audio.paused) return;
    // Keep play() in the original user gesture so browsers can authorize audio.
    void audio.play().catch(() => setPlaying(false));
  }, []);

  useImperativeHandle(ref, () => ({ startFromGesture: play }), [play]);

  function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else audio.pause();
  }

  return (
    <>
      <audio
        ref={audioRef}
        src={event.audioSrc}
        preload="none"
        loop
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onError={() => setPlaying(false)}
      />
      <button
        className="music-control"
        type="button"
        onClick={toggle}
        aria-label={playing ? siteContent.musicOn : siteContent.musicOff}
        aria-pressed={playing}
      >
        {playing ? (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="M15.5 8.5a5 5 0 0 1 0 7M18.5 5.5a9 9 0 0 1 0 13" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M11 5 6 9H3v6h3l5 4V5Z" />
            <path d="m16 9 5 6m0-6-5 6" />
          </svg>
        )}
      </button>
    </>
  );
}
