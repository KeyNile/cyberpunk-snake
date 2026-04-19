// src/game/GameLoop.ts
import { useGameStore } from '../store/gameStore';
import { moveSnake, growSnake, isOpposite } from './Snake';
import { hitSelf, hitObstacle, ateFood } from './Collision';
import { spawnFood, spawnObstacle } from './Map';
import { TICK_MS_MIN } from '../constants/theme';

const OBSTACLE_INTERVAL_MS = 30_000;
const SPEED_THRESHOLD = 100;
const SPEED_FACTOR = 0.9;

let rafId: number | null = null;
let lastTick = 0;
let lastObstacleSpawn = 0;
let combo = 0;

export function startGameLoop() {
  const store = useGameStore.getState();
  store.setPhase('playing');
  lastTick = performance.now();
  lastObstacleSpawn = performance.now();
  combo = 0;
  rafId = requestAnimationFrame(tick);
}

export function stopGameLoop() {
  if (rafId !== null) cancelAnimationFrame(rafId);
  rafId = null;
}

function tick(now: number) {
  const store = useGameStore.getState();
  if (store.phase !== 'playing') return;

  // 장애물 30초 스폰
  if (now - lastObstacleSpawn >= OBSTACLE_INTERVAL_MS) {
    const newObs = spawnObstacle(store.obstacles, store.snake);
    store.setObstacles([...store.obstacles, newObs]);
    lastObstacleSpawn = now;
  }

  // 틱 간격마다 이동
  if (now - lastTick >= store.tickMs) {
    lastTick = now;

    // 반대 방향 전환 방지
    const dir = isOpposite(store.nextDirection, store.direction)
      ? store.direction
      : store.nextDirection;
    store.setDirection(dir);

    const { newSnake, wrappedWall } = moveSnake(store.snake, dir);

    // 벽 통과 보너스
    if (wrappedWall) store.addScore(5);

    // 충돌 검사
    if (hitSelf(newSnake) || hitObstacle(newSnake, store.obstacles)) {
      store.setPhase('dead');
      combo = 0;
      return;
    }

    // 먹이 획득
    if (ateFood(newSnake, store.food)) {
      combo += 1;
      const multiplier = Math.min(combo, 5);
      const gained = 10 * multiplier;
      store.addScore(gained);
      store.setSnake(growSnake(newSnake));
      store.setFood(spawnFood(newSnake, store.obstacles));

      // 점수 100마다 속도 증가
      const newScore = store.score + gained;
      if (Math.floor(newScore / SPEED_THRESHOLD) > Math.floor(store.score / SPEED_THRESHOLD)) {
        store.setTickMs(Math.max(TICK_MS_MIN, Math.floor(store.tickMs * SPEED_FACTOR)));
      }
    } else {
      combo = 0;
      store.setSnake(newSnake);
    }
  }

  rafId = requestAnimationFrame(tick);
}
