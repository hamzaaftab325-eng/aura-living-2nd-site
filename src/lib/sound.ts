/**
 * Sound Utility — subtle UI sounds via Web Audio API.
 *
 * Spec (DESIGN.md): "Use very subtle UI sounds for: Add to cart, Success,
 * Notifications. Allow users to disable them."
 *
 * Implementation:
 *   - Lazy Web Audio context (created on first user gesture)
 *   - All sounds synthesized (no audio files to load)
 *   - Default OFF — user must opt-in via localStorage flag
 *   - Subtle, short, low-volume blips — never jarring
 *
 * Usage:
 *   import { playSound, toggleSounds, soundsEnabled } from "@/lib/sound";
 *
 *   if (soundsEnabled()) playSound("addToCart");
 *   <button onClick={() => toggleSounds()}>Sound: {soundsEnabled() ? "On" : "Off"}</button>
 */

const STORAGE_KEY = "aura-living-sound-enabled";

let audioContext: AudioContext | null = null;
let enabled: boolean | null = null;

function isEnabled(): boolean {
  if (enabled === null) {
    if (typeof window === "undefined") return false;
    enabled = localStorage.getItem(STORAGE_KEY) === "true";
  }
  return enabled;
}

function getContext(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioContext) {
    try {
      const Ctor =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext })
          .webkitAudioContext;
      audioContext = new Ctor();
    } catch {
      return null;
    }
  }
  // Resume if suspended (browsers require user gesture)
  if (audioContext.state === "suspended") {
    audioContext.resume().catch(() => {
      /* silent */
    });
  }
  return audioContext;
}

type SoundType =
  | "addToCart"
  | "success"
  | "notification"
  | "hover"
  | "click"
  | "error";

interface SoundConfig {
  freq: number;
  duration: number;
  type: OscillatorType;
  volume: number;
  /** Optional second oscillator for chord-like sounds */
  chord?: number;
  /** Glide to this frequency (for "success" rising tone) */
  glideTo?: number;
}

const SOUND_CONFIGS: Record<SoundType, SoundConfig> = {
  // Soft blip — add to cart confirmation
  addToCart: {
    freq: 880,
    duration: 0.12,
    type: "sine",
    volume: 0.06,
    glideTo: 1320,
  },
  // Rising two-note chord — success
  success: {
    freq: 660,
    duration: 0.25,
    type: "sine",
    volume: 0.08,
    chord: 990,
    glideTo: 990,
  },
  // Single soft tone — notification
  notification: {
    freq: 740,
    duration: 0.18,
    type: "sine",
    volume: 0.05,
  },
  // Very quiet tick — hover (use sparingly)
  hover: {
    freq: 1200,
    duration: 0.04,
    type: "sine",
    volume: 0.015,
  },
  // Soft click — button press
  click: {
    freq: 600,
    duration: 0.06,
    type: "sine",
    volume: 0.03,
  },
  // Low descending tone — error
  error: {
    freq: 440,
    duration: 0.2,
    type: "sine",
    volume: 0.05,
    glideTo: 220,
  },
};

function playOscillator(
  ctx: AudioContext,
  config: SoundConfig,
  freqOverride?: number,
  delay = 0,
) {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = config.type;
  const startFreq = freqOverride ?? config.freq;
  osc.frequency.setValueAtTime(startFreq, ctx.currentTime + delay);

  if (config.glideTo) {
    osc.frequency.exponentialRampToValueAtTime(
      config.glideTo,
      ctx.currentTime + delay + config.duration,
    );
  }

  gain.gain.setValueAtTime(0, ctx.currentTime + delay);
  gain.gain.linearRampToValueAtTime(
    config.volume,
    ctx.currentTime + delay + 0.01,
  );
  gain.gain.exponentialRampToValueAtTime(
    0.0001,
    ctx.currentTime + delay + config.duration,
  );

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + config.duration + 0.05);
}

export function playSound(type: SoundType): void {
  if (!isEnabled()) return;
  const ctx = getContext();
  if (!ctx) return;

  const config = SOUND_CONFIGS[type];
  playOscillator(ctx, config);
  if (config.chord) {
    playOscillator(ctx, config, config.chord, 0.05);
  }
}

export function soundsEnabled(): boolean {
  return isEnabled();
}

export function toggleSounds(): boolean {
  const next = !isEnabled();
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, String(next));
  }
  enabled = next;
  if (next) {
    // Play success tone to confirm
    playSound("notification");
  }
  return next;
}
