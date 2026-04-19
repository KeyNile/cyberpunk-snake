// src/game/Collision.ts
import { Point } from '../store/gameStore';

export function hitSelf(snake: Point[]): boolean {
  const [head, ...body] = snake;
  return body.some((p) => p.x === head.x && p.y === head.y);
}

export function hitObstacle(snake: Point[], obstacles: Point[]): boolean {
  const head = snake[0];
  return obstacles.some((o) => o.x === head.x && o.y === head.y);
}

export function ateFood(snake: Point[], food: Point): boolean {
  return snake[0].x === food.x && snake[0].y === food.y;
}
