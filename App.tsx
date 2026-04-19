import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';

export default function App() {
  const [screen, setScreen] = useState<'home' | 'game'>('home');
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      {screen === 'home'
        ? <HomeScreen onStart={() => setScreen('game')} />
        : <GameScreen onHome={() => setScreen('home')} />}
    </GestureHandlerRootView>
  );
}
