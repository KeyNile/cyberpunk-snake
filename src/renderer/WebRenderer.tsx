// src/renderer/WebRenderer.tsx — HTML5 Canvas renderer for web
import React, { useRef, useEffect } from 'react';
import { useGameStore } from '../store/gameStore';
import { CELL_SIZE, CANVAS_SIZE, GRID_SIZE, COLORS } from '../constants/theme';

export function WebRenderer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { snake, food, obstacles } = useGameStore();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    ctx.fillStyle = COLORS.background;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Grid
    ctx.strokeStyle = COLORS.grid;
    ctx.lineWidth = 0.5;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath(); ctx.moveTo(i * CELL_SIZE, 0); ctx.lineTo(i * CELL_SIZE, CANVAS_SIZE); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(0, i * CELL_SIZE); ctx.lineTo(CANVAS_SIZE, i * CELL_SIZE); ctx.stroke();
    }

    // Obstacles
    ctx.fillStyle = COLORS.obstacle;
    ctx.shadowColor = COLORS.obstacleGlow;
    ctx.shadowBlur = 10;
    obstacles.forEach(o => {
      ctx.fillRect(o.x * CELL_SIZE + 1, o.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    // Food
    ctx.fillStyle = COLORS.food;
    ctx.shadowColor = COLORS.foodGlow;
    ctx.shadowBlur = 14;
    ctx.beginPath();
    ctx.arc(food.x * CELL_SIZE + CELL_SIZE / 2, food.y * CELL_SIZE + CELL_SIZE / 2, CELL_SIZE / 2 - 2, 0, Math.PI * 2);
    ctx.fill();

    // Snake body
    ctx.fillStyle = COLORS.snakeBody;
    ctx.shadowColor = COLORS.snakeGlow;
    ctx.shadowBlur = 8;
    snake.slice(1).forEach(p => {
      ctx.fillRect(p.x * CELL_SIZE + 1, p.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    });

    // Snake head
    if (snake.length > 0) {
      ctx.fillStyle = COLORS.snakeHead;
      ctx.shadowColor = COLORS.snakeGlow;
      ctx.shadowBlur = 16;
      ctx.fillRect(snake[0].x * CELL_SIZE + 1, snake[0].y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
    }

    ctx.shadowBlur = 0;
  }, [snake, food, obstacles]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      style={{ display: 'block' }}
    />
  );
}
