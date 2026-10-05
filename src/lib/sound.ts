/**
 * Audio feedback utility powered by Cuelume (https://cuelume.dev).
 * Synthesized live via the Web Audio API with zero runtime audio files.
 */
import { play, bind, setEnabled, setVolume, setTheme, type SoundName } from 'cuelume';

let lastPlayTime = 0;

/**
 * Plays the 'select' sound cue from Cuelume for taps and interactive activations.
 * Protected with a micro-throttle to prevent duplicate sounds on rapid simultaneous events.
 */
export function playSelectSound() {
  if (typeof window === 'undefined') return;
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (now - lastPlayTime < 25) return;
  lastPlayTime = now;
  play('select');
}

/**
 * Backwards-compatible alias for playSelectSound.
 */
export const playClickSound = playSelectSound;

let lastTapTime = 0;

/**
 * Plays the 'tap' sound cue from Cuelume for tile hover interactions and tactile cues.
 * Protected with a micro-throttle to prevent duplicate sounds on rapid simultaneous events.
 */
export function playTapSound() {
  if (typeof window === 'undefined') return;
  const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
  if (now - lastTapTime < 25) return;
  lastTapTime = now;
  play('tap');
}

/**
 * Plays the 'success' sound cue from Cuelume for confirmed actions (e.g. copying email).
 */
export function playSuccessSound() {
  if (typeof window === 'undefined') return;
  play('success');
}

export { play, bind, setEnabled, setVolume, setTheme };
export type { SoundName };
