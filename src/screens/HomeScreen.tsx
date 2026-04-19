// src/screens/HomeScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/theme';

export function HomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>CYBER</Text>
      <Text style={styles.title}>SNAKE</Text>
      <TouchableOpacity onPress={onStart}>
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
