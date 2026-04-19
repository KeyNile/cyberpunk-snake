// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';
import { initSound } from '../sound/SoundManager';

export function HomeScreen({ onStart }: { onStart: () => void }) {
  const handleStart = () => {
    initSound(); // 사용자 인터랙션으로 AudioContext 활성화
    onStart();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CYBER</Text>
      <Text style={styles.title}>SNAKE</Text>
      <TouchableOpacity onPress={handleStart}>
        <Text style={styles.start}>[ START ]</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center' },
  title: { color: COLORS.snakeHead, fontSize: 48, fontFamily: 'monospace', letterSpacing: 8 },
  start: { color: COLORS.food, fontSize: 24, fontFamily: 'monospace', marginTop: 48 },
});
