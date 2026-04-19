// src/renderer/SkiaRenderer.tsx
import React from 'react';
import { Canvas, Rect, Circle, Shadow, Group } from '@shopify/react-native-skia';
import { useGameStore } from '../store/gameStore';
import { CELL_SIZE, GRID_SIZE, CANVAS_SIZE, COLORS } from '../constants/theme';

export function SkiaRenderer() {
  const { snake, food, obstacles } = useGameStore();

  return (
    <Canvas style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}>
      {/* 배경 */}
      <Rect x={0} y={0} width={CANVAS_SIZE} height={CANVAS_SIZE} color={COLORS.background} />

      {/* 그리드 라인 */}
      {Array.from({ length: GRID_SIZE + 1 }).map((_, i) => (
        <React.Fragment key={i}>
          <Rect x={i * CELL_SIZE} y={0} width={0.5} height={CANVAS_SIZE} color={COLORS.grid} />
          <Rect x={0} y={i * CELL_SIZE} width={CANVAS_SIZE} height={0.5} color={COLORS.grid} />
        </React.Fragment>
      ))}

      {/* 장애물 */}
      {obstacles.map((o, i) => (
        <Group key={`obs-${i}`}>
          <Rect
            x={o.x * CELL_SIZE + 1} y={o.y * CELL_SIZE + 1}
            width={CELL_SIZE - 2} height={CELL_SIZE - 2}
            color={COLORS.obstacle}
          >
            <Shadow dx={0} dy={0} blur={8} color={COLORS.obstacleGlow} />
          </Rect>
        </Group>
      ))}

      {/* 먹이 */}
      <Group>
        <Circle
          cx={food.x * CELL_SIZE + CELL_SIZE / 2}
          cy={food.y * CELL_SIZE + CELL_SIZE / 2}
          r={CELL_SIZE / 2 - 2}
          color={COLORS.food}
        >
          <Shadow dx={0} dy={0} blur={10} color={COLORS.foodGlow} />
        </Circle>
      </Group>

      {/* 뱀 몸통 */}
      {snake.slice(1).map((p, i) => (
        <Rect
          key={`body-${i}`}
          x={p.x * CELL_SIZE + 1} y={p.y * CELL_SIZE + 1}
          width={CELL_SIZE - 2} height={CELL_SIZE - 2}
          color={COLORS.snakeBody}
        >
          <Shadow dx={0} dy={0} blur={6} color={COLORS.snakeGlow} />
        </Rect>
      ))}

      {/* 뱀 머리 */}
      {snake.length > 0 && (
        <Rect
          x={snake[0].x * CELL_SIZE + 1} y={snake[0].y * CELL_SIZE + 1}
          width={CELL_SIZE - 2} height={CELL_SIZE - 2}
          color={COLORS.snakeHead}
        >
          <Shadow dx={0} dy={0} blur={12} color={COLORS.snakeGlow} />
        </Rect>
      )}
    </Canvas>
  );
}
