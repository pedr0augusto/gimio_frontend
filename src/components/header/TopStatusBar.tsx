import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';
// REMOVEMOS A IMPORTAÇÃO DE SafeAreaView
// import { SafeAreaView } from 'react-native-safe-area-context'; 
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
    // O SafeAreaView FOI REMOVIDO AQUI
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
    // FIM DA REMOÇÃO DO SafeAreaView
  );
}

const styles = StyleSheet.create({
  // O estilo safeArea FOI REMOVIDO DAQUI
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 0,
    
    // ADICIONAMOS padding-top para respeitar a área segura do dispositivo (notch, barra de status)
    paddingTop: 15, // Ajuste este valor se a barra não estiver totalmente visível
  },
});