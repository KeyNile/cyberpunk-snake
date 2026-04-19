// src/store/gameStore.ts
import { create } from 'zustand';
import { GRID_SIZE, TICK_MS } from '../constants/theme';

export type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
export type Phase = 'idle' | 'playing' | 'dead';
export type Point = { x: number; y: number };

interface GameState {
  phase: Phase;
  score: number;
  snake: Point[];
  direction: Direction;
  nextDirection: Direction;
  food: Point;
  obstacles: Point[];
  tickMs: number;

  setPhase: (phase: Phase) => void;
  addScore: (n: number) => void;
  setSnake: (snake: Point[]) => void;
  setDirection: (d: Direction) => void;
  setNextDirection: (d: Direction) => void;
  setFood: (p: Point) => void;
  setObstacles: (obs: Point[]) => void;
  setTickMs: (ms: number) => void;
  reset: () => void;
}

const randomPoint = (): Point => ({
  x: Math.floor(Math.random() * GRID_SIZE),
  y: Math.floor(Math.random() * GRID_SIZE),
});

const initialSnake: Point[] = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

export const useGameStore = create<GameState>((set) => ({
  phase: 'idle',
  score: 0,
  snake: initialSnake,
  direction: 'RIGHT',
  nextDirection: 'RIGHT',
  food: randomPoint(),
  obstacles: [],
  tickMs: TICK_MS,

  setPhase: (phase) => set({ phase }),
  addScore: (n) => set((s) => ({ score: s.score + n })),
  setSnake: (snake) => set({ snake }),
  setDirection: (direction) => set({ direction }),
  setNextDirection: (nextDirection) => set({ nextDirection }),
  setFood: (food) => set({ food }),
  setObstacles: (obstacles) => set({ obstacles }),
  setTickMs: (tickMs) => set({ tickMs }),
  reset: () => set({
    phase: 'idle',
    score: 0,
    snake: initialSnake,
    direction: 'RIGHT',
    nextDirection: 'RIGHT',
    food: randomPoint(),
    obstacles: [],
    tickMs: TICK_MS,
  }),
}));
