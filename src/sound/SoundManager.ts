// src/sound/SoundManager.ts — Web Audio API procedural sound effects
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
  if (!AC) return null;
  if (!ctx) ctx = new AC();
  // 브라우저 정책: 사용자 인터랙션 후 resume 필요
  if (ctx.state === 'suspended') ctx.resume();
  return ctx;
}

// 사용자 첫 인터랙션 시 AudioContext 준비
export function initSound() {
  getCtx();
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  gainValue = 0.15,
  freqEnd?: number,
) {
  try {
    const ac = getCtx();
    if (!ac || ac.state === 'suspended') return;

    const osc = ac.createOscillator();
    const gain = ac.createGain();
    osc.connect(gain);
    gain.connect(ac.destination);

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, ac.currentTime);
    if (freqEnd !== undefined) {
      osc.frequency.linearRampToValueAtTime(freqEnd, ac.currentTime + duration);
    }

    gain.gain.setValueAtTime(gainValue, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + duration);

    osc.start(ac.currentTime);
    osc.stop(ac.currentTime + duration);
  } catch (_) {}
}

export const SoundManager = {
  eatFood() {
    playTone(440, 0.08, 'square', 0.12, 880);
  },

  combo(level: number) {
    const base = 440 + level * 80;
    playTone(base, 0.1, 'sine', 0.15, base * 1.5);
  },

  wallWarp() {
    playTone(200, 0.15, 'sawtooth', 0.1, 600);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.08, 200), 80);
  },

  obstacleSpawn() {
    playTone(80, 0.2, 'sawtooth', 0.1, 40);
    playTone(300, 0.1, 'square', 0.06, 150);
  },

  gameOver() {
    playTone(440, 0.2, 'square', 0.15, 220);
    setTimeout(() => playTone(220, 0.2, 'square', 0.12, 110), 200);
    setTimeout(() => playTone(110, 0.4, 'sawtooth', 0.1, 55), 400);
  },
};
