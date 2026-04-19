// src/sound/SoundManager.ts — Web Audio API procedural sound effects
let ctx: AudioContext | null = null;

function getCtx(): AudioContext | null {
  if (typeof AudioContext === 'undefined' && typeof (window as any).webkitAudioContext === 'undefined') return null;
  if (!ctx) ctx = new (AudioContext || (window as any).webkitAudioContext)();
  return ctx;
}

function playTone(
  frequency: number,
  duration: number,
  type: OscillatorType = 'square',
  gainValue = 0.15,
  freqEnd?: number,
) {
  const ac = getCtx();
  if (!ac) return;

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
}

export const SoundManager = {
  // 먹이 획득 — 상승하는 비프음
  eatFood() {
    playTone(440, 0.08, 'square', 0.12, 880);
  },

  // 콤보 — 더 높고 밝은 음
  combo(level: number) {
    const base = 440 + level * 80;
    playTone(base, 0.1, 'sine', 0.15, base * 1.5);
  },

  // 벽 통과 — 포탈 워프 사운드
  wallWarp() {
    playTone(200, 0.15, 'sawtooth', 0.1, 600);
    setTimeout(() => playTone(600, 0.1, 'sine', 0.08, 200), 80);
  },

  // 장애물 스폰 — 전기 스파크
  obstacleSpawn() {
    playTone(80, 0.2, 'sawtooth', 0.1, 40);
    playTone(300, 0.1, 'square', 0.06, 150);
  },

  // 게임오버 — 하강하는 음
  gameOver() {
    playTone(440, 0.2, 'square', 0.15, 220);
    setTimeout(() => playTone(220, 0.2, 'square', 0.12, 110), 200);
    setTimeout(() => playTone(110, 0.4, 'sawtooth', 0.1, 55), 400);
  },
};
