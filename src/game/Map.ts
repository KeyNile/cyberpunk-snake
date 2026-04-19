// src/game/Map.ts
import { GRID_SIZE } from '../constants/theme';
import { Point } from '../store/gameStore';

// 그리드 중앙 6x6 영역 제외하고 랜덤 장애물 생성
export function spawnObstacle(existing: Point[], snake: Point[]): Point {
  const center = Math.floor(GRID_SIZE / 2);
  const forbidden = new Set([
    ...existing.map((p) => `${p.x},${p.y}`),
    ...snake.map((p) => `${p.x},${p.y}`),
  ]);

  let p: Point;
  do {
    p = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (
    forbidden.has(`${p.x},${p.y}`) ||
    (Math.abs(p.x - center) <= 3 && Math.abs(p.y - center) <= 3)
  );

  return p;
}

export function spawnFood(snake: Point[], obstacles: Point[]): Point {
  const forbidden = new Set([
    ...snake.map((p) => `${p.x},${p.y}`),
    ...obstacles.map((p) => `${p.x},${p.y}`),
  ]);

  let p: Point;
  do {
    p = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (forbidden.has(`${p.x},${p.y}`));

  return p;
}
