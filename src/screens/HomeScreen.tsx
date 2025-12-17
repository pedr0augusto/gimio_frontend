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

// UI
import { BottomMenu } from '../components/BottomMenu';
import { TopStatusBar } from '../components/header/TopStatusBar';

// Missões
import { MissionInfoModal } from '../components/missions/MissionInfoModal';
import { Mission } from '../components/missions/MissionItem';
import { MissionsList } from '../components/missions/MissionsList';

// --- DADOS DE TESTE ---
const initialMissions: Mission[] = [
  { id: 1, title: 'Matemática básica', type: 'matematica', completed: false },
  { id: 2, title: 'Biologia celular I', type: 'biologia', completed: false },
  { id: 3, title: 'Interpretação de texto I', type: 'portugues', completed: false },
  { id: 4, title: 'Quimica I', type: 'quimica', completed: false },
  { id: 5, title: 'Fisica I', type: 'fisica', completed: false },
];
// --- FIM ---

export function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const backgroundColor = isDark ? '#121212' : '#FFFFFF';
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';

  const statusBarProps = {
    level: 15,
    streak: 7,
    gems: 120,
    lives: 5,
  };

  const menuProps = {
    onPressHome: () => {},
    onPressRedacao: () => {},
    onPressCalculadora: () => {},
    onPressPremium: () => {},
    onPressSettings: () => {},
  };

  const [missions, setMissions] = useState<Mission[]>(initialMissions);

  // MISSÃO SELECIONADA (MODAL)
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [anchorX, setAnchorX] = useState(0); // posição horizontal da bolha
  const [anchorY, setAnchorY] = useState(0); // posição vertical da bolha

  // 👉 Ao clicar na missão (APENAS abre o modal)
const handleMissionPress = (missionId: number, ref: React.RefObject<View | null>) => {
  const mission = missions.find(m => m.id === missionId);
  if (!mission || !ref.current) return;

  ref.current.measure((fx, fy, width, height, px, py) => {
    setSelectedMission(mission);
    setAnchorY(py + height + 10); // posição vertical da bolha
    setAnchorX(px + width / 2); // posição horizontal da bolha/ seta
  });
};


  // 👉 Concluir missão ao clicar em "Começar"
  const handleStartMission = () => {
    if (!selectedMission) return;

    setMissions(prev => {
      const updated = [...prev];
      const index = updated.findIndex(m => m.id === selectedMission.id);

      if (index !== -1) {
        updated[index] = {
          ...updated[index],
          completed: true,
        };
      }

      return updated;
    });

    setSelectedMission(null);
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

        <ScrollView style={styles.contentArea}>
          <MissionsList
            missions={missions}
            onMissionPress={handleMissionPress} // agora recebe (id, ref)
          />

          <Text
            style={{
              textAlign: 'center',
              padding: 20,
              color: isDark ? '#aaa' : '#888',
            }}
          >
            Explore a trilha de aprendizado!
          </Text>
        </ScrollView>

        <BottomMenu {...menuProps} />
      </View>

      {/* MODAL DA MISSÃO */}
      <MissionInfoModal
        visible={!!selectedMission}
        missionId={selectedMission?.id ?? 0}
        title={selectedMission?.title ?? ''}
        type={selectedMission?.type ?? 'matematica'}
        anchorY={anchorY}
        anchorX={anchorX}
        onClose={() => setSelectedMission(null)}
        onStart={handleStartMission}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
  container: { flex: 1 },
  contentArea: { flex: 1 },
});
