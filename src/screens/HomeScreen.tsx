import React, { useState } from 'react';
import { View, StyleSheet, Button, ScrollView, Text } from 'react-native';
import { TopStatusBar } from '../components/header/TopStatusBar';
import { BottomMenu } from '../components/BottomMenu';

export default function HomeScreen() {
  const [level, setLevel] = useState(1);
  const [streak, setStreak] = useState(0);
  const [gems, setGems] = useState(0);
  const [lives, setLives] = useState(3);

  return (
    <View style={styles.container}>
      {/* Top menu flutuante */}
      <TopStatusBar
        level={level}
        streak={streak}
        gems={gems}
        lives={lives}
      />

      {/* Conteúdo da tela */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.buttonsContainer}>
          <Text style={styles.label}>Nível</Text>
          <View style={styles.buttonRow}>
            <Button title="-" onPress={() => setLevel(prev => Math.max(prev - 1, 1))} />
            <Button title="+" onPress={() => setLevel(prev => Math.min(prev + 1, 120))} />
          </View>

          <Text style={styles.label}>Ofensiva</Text>
          <View style={styles.buttonRow}>
            <Button title="-" onPress={() => setStreak(prev => Math.max(prev - 1, 0))} />
            <Button title="+" onPress={() => setStreak(prev => prev + 1)} />
          </View>

          <Text style={styles.label}>Gemas</Text>
          <View style={styles.buttonRow}>
            <Button title="-" onPress={() => setGems(prev => Math.max(prev - 1, 0))} />
            <Button title="+" onPress={() => setGems(prev => prev + 10)} />
          </View>

          <Text style={styles.label}>Vidas</Text>
          <View style={styles.buttonRow}>
            <Button title="-" onPress={() => setLives(prev => Math.max(prev - 1, 0))} />
            <Button title="+" onPress={() => setLives(prev => prev + 1)} />
          </View>
        </View>
      </ScrollView>

      {/* Bottom menu flutuante */}
      <BottomMenu
        onPressHome={() => console.log('Home')}
        onPressRedacao={() => console.log('Redação')}
        onPressCalculadora={() => console.log('Calculadora')}
        onPressPremium={() => console.log('Premium')}
        onPressSettings={() => console.log('Settings')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
  scrollContent: {
    paddingTop: 80, // espaço para o TopStatusBar
    paddingBottom: 80, // espaço para o BottomMenu
    paddingHorizontal: 16,
  },
  buttonsContainer: {
    marginTop: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 4,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 12,
  },
});
