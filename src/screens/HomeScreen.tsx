import React, { useState } from 'react';
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

// Componentes de UI
import { BottomMenu } from '../components/BottomMenu';
import { TopStatusBar } from '../components/header/TopStatusBar';

// Componentes de Missões
import { Mission } from '../components/missions/MissionItem';
import { MissionsList } from '../components/missions/MissionsList';

// --- DADOS DE TESTE DE MISSÕES ---
const initialMissions: Mission[] = [
  { id: 1, title: 'Exercícios de Matemática', type: 'matematica', completed: false },
  { id: 2, title: 'Exercícios de Biologia', type: 'biologia', completed: false },
  { id: 3, title: 'Exercícios de Português', type: 'portugues', completed: false },
  { id: 4, title: 'Exercícios de Matemática', type: 'matematica', completed: false },
  { id: 5, title: 'Exercícios de Biologia', type: 'biologia', completed: false },
  { id: 6, title: 'Exercícios de Português', type: 'portugues', completed: false },
];
// --- FIM DOS DADOS DE TESTE ---

export function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const backgroundColor = isDark ? '#121212' : '#FFFFFF'; // PRETO ABSOLUTO para OLED/AMOLED
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';

  const statusBarProps = { level: 15, streak: 7, gems: 120, lives: 5 };

  const menuProps = {
    onPressHome: () => console.log('Navegar para Home'),
    onPressRedacao: () => console.log('Abrir Redação'),
    onPressCalculadora: () => console.log('Abrir Calculadora'),
    onPressPremium: () => console.log('Abrir Premium'),
    onPressSettings: () => console.log('Abrir Configurações'),
  };

  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  const handleMissionPress = (missionId: number) => {
    setMissions(prevMissions => {
      const nextIndex = prevMissions.findIndex(m => !m.completed);
      if (nextIndex === -1) return prevMissions;
      if (prevMissions[nextIndex].id === missionId) {
        const updated = [...prevMissions];
        updated[nextIndex] = { ...updated[nextIndex], completed: true };
        return updated;
      }
      return prevMissions;
    });
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        translucent={Platform.OS === 'android'}
      />

      <View style={[styles.container, { backgroundColor }]}>
        <TopStatusBar {...statusBarProps} />

        <ScrollView style={[styles.contentArea, { backgroundColor }]}>
          <MissionsList missions={missions} onMissionPress={handleMissionPress} />

          <Text style={{ textAlign: 'center', padding: 20, color: isDark ? '#aaa' : '#888' }}>
            Explore a trilha de aprendizado!
          </Text>
        </ScrollView>

        <BottomMenu {...menuProps} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  contentArea: { flex: 1 },
});
