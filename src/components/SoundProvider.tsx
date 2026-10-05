'use client';

import { useEffect } from 'react';
import { bind, playSelectSound } from '@/lib/sound';

/**
 * Global audio provider powered by Cuelume (https://cuelume.dev).
 * Automatically initializes cuelume bind() for declarative sound attributes
 * (such as data-cuelume-hover="tap" on project and social tiles) and plays
 * the 'select' sound for interactive taps/clicks across the website.
 */
export function SoundProvider() {
  useEffect(() => {
    // Initialize declarative bindings from Cuelume
    bind();

    // Capture all taps/clicks across the website to play the 'select' sound,
    // unless an element opts out (e.g. email copy button which plays 'success')
    const handleGlobalTap = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest?.('[data-cuelume-click="none"]')) {
        return;
      }
      playSelectSound();
    };

    window.addEventListener('click', handleGlobalTap, { capture: true });

    return () => {
      window.removeEventListener('click', handleGlobalTap, { capture: true });
    };
  }, []);

  return null;
}
