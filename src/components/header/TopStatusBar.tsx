import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusItem } from './StatusItem';
import { getLevelColor, getLevelIcon } from './levelUtils';

interface TopStatusBarProps {
  level: number;
  streak: number;
  gems: number;
  lives: number;
}

export function TopStatusBar({ level, streak, gems, lives }: TopStatusBarProps) {
  const colorScheme = useColorScheme(); // 'light' | 'dark'
  const isDark = colorScheme === 'dark';

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : 'transparent' }]}>
        {/* Nível */}
        <StatusItem
          icon={getLevelIcon(level)}
          value={`${level}`}
          textColor={getLevelColor(level)}
        />

        {/* Ofensiva */}
        <StatusItem
          icon={require('../../assets/icons/fire.png')}
          value={streak}
          textColor="#FFA500"
        />

        {/* Gemas */}
        <StatusItem
          icon={require('../../assets/icons/gem.png')}
          value={gems}
          textColor="#ca0acaff"
        />

        {/* Vidas */}
        <StatusItem
          icon={require('../../assets/icons/heart.png')}
          value={lives}
          textColor="#FF0000"
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#121212', // fundo escuro
  },
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    zIndex: 100,
  },
});
