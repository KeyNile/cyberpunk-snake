import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface State { error: Error | null }

export class ErrorBoundary extends React.Component<{ children: React.ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>ERROR</Text>
          <Text style={styles.msg}>{this.state.error.message}</Text>
          <Text style={styles.stack}>{this.state.error.stack?.slice(0, 400)}</Text>
        </View>
      );
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0a0a1a', padding: 20, justifyContent: 'center' },
  title: { color: '#ff2d6f', fontSize: 24, marginBottom: 16 },
  msg: { color: '#ffffff', fontSize: 14, marginBottom: 16 },
  stack: { color: '#888', fontSize: 11 },
});
