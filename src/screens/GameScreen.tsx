// src/screens/GameScreen.tsx
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { useGameStore } from '../store/gameStore';
import { SkiaRenderer } from '../renderer/SkiaRenderer';
import { WebRenderer } from '../renderer/WebRenderer';
import { startGameLoop, stopGameLoop } from '../game/GameLoop';
import { isOpposite } from '../game/Snake';
import { COLORS } from '../constants/theme';

const Renderer = Platform.OS === 'web' ? WebRenderer : SkiaRenderer;

export function GameScreen({ onHome }: { onHome: () => void }) {
  const { phase, score, setNextDirection, direction, reset } = useGameStore();

  useEffect(() => {
    reset();
    startGameLoop();
    return () => stopGameLoop();
  }, []);

  // 웹 키보드 방향키 지원
  useEffect(() => {
    if (Platform.OS !== 'web') return;
    const onKey = (e: KeyboardEvent) => {
      const map: Record<string, 'UP'|'DOWN'|'LEFT'|'RIGHT'> = {
        ArrowUp: 'UP', ArrowDown: 'DOWN', ArrowLeft: 'LEFT', ArrowRight: 'RIGHT',
        w: 'UP', s: 'DOWN', a: 'LEFT', d: 'RIGHT',
      };
      const next = map[e.key];
      if (next) {
        e.preventDefault();
        const { direction, setNextDirection } = useGameStore.getState();
        if (!isOpposite(next, direction)) setNextDirection(next);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const swipe = Gesture.Pan().onEnd((e) => {
    const { translationX: dx, translationY: dy } = e;
    let next: 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';
    if (Math.abs(dx) > Math.abs(dy)) {
      next = dx > 0 ? 'RIGHT' : 'LEFT';
    } else {
      next = dy > 0 ? 'DOWN' : 'UP';
    }
    if (!isOpposite(next, direction)) setNextDirection(next);
  });

  return (
    <View style={styles.container}>
      <Text style={styles.score}>SCORE: {score}</Text>
      <GestureDetector gesture={swipe}>
        <View>
          <Renderer />
        </View>
      </GestureDetector>
      {phase === 'dead' && (
        <View style={styles.overlay}>
          <Text style={styles.gameOver}>GAME OVER</Text>
          <Text style={styles.btn} onPress={() => { reset(); startGameLoop(); }}>RETRY</Text>
          <Text style={styles.btn} onPress={onHome}>HOME</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  score: { color: COLORS.snakeHead, fontSize: 20, fontFamily: 'monospace', marginBottom: 12 },
  overlay: { position: 'absolute', alignItems: 'center' },
  gameOver: { color: COLORS.food, fontSize: 36, fontFamily: 'monospace', marginBottom: 24 },
  btn: { color: COLORS.snakeHead, fontSize: 20, fontFamily: 'monospace', marginVertical: 8 },
});
