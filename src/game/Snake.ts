// src/game/Snake.ts
import { GRID_SIZE } from '../constants/theme';
import { Direction, Point } from '../store/gameStore';

export function moveSnake(snake: Point[], direction: Direction): {
  newSnake: Point[];
  wrappedWall: boolean;
} {
  const head = snake[0];
  let newHead: Point;

  switch (direction) {
    case 'UP':    newHead = { x: head.x, y: head.y - 1 }; break;
    case 'DOWN':  newHead = { x: head.x, y: head.y + 1 }; break;
    case 'LEFT':  newHead = { x: head.x - 1, y: head.y }; break;
    case 'RIGHT': newHead = { x: head.x + 1, y: head.y }; break;
  }

  const wrappedWall =
    newHead.x < 0 || newHead.x >= GRID_SIZE ||
    newHead.y < 0 || newHead.y >= GRID_SIZE;

  // 벽 통과: 반대편으로 등장
  newHead = {
    x: ((newHead.x % GRID_SIZE) + GRID_SIZE) % GRID_SIZE,
    y: ((newHead.y % GRID_SIZE) + GRID_SIZE) % GRID_SIZE,
  };

  return {
    newSnake: [newHead, ...snake.slice(0, -1)],
    wrappedWall,
  };
}

export function growSnake(snake: Point[]): Point[] {
  return [...snake, snake[snake.length - 1]];
}

export function isOpposite(a: Direction, b: Direction): boolean {
  return (
    (a === 'UP' && b === 'DOWN') ||
    (a === 'DOWN' && b === 'UP') ||
    (a === 'LEFT' && b === 'RIGHT') ||
    (a === 'RIGHT' && b === 'LEFT')
  );
}
