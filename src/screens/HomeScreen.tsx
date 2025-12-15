import React from 'react';
import { 
  SafeAreaView, 
  View, 
  ScrollView, 
  StyleSheet, 
  Text, 
  useColorScheme,
  StatusBar,
  Platform, // Importado para ajustes na barra de status em diferentes plataformas
} from 'react-native';

// Assumindo a estrutura: screens/HomeScreen.tsx => ../components/...
import { TopStatusBar } from '../components/header/TopStatusBar'; 
import { BottomMenu } from '../components/BottomMenu';

// Componentes e Tipagem
import { MissionsList } from '../components/missions/MissionsList'; 
import { Mission, MissionType } from '../components/missions/MissionItem'; 

// --- DADOS DE TESTE DE MISSÕES --- (Com item 12 corrigido)
const initialMissions: Mission[] = [
  { id: 1, title: 'Introdução à Álgebra', type: 'matematica', completed: true },
  { id: 2, title: 'Células e Tecidos', type: 'biologia', completed: true },
  { id: 3, title: 'Crônicas Famosas', type: 'portugues', completed: false },
  { id: 4, title: 'Geometria Espacial', type: 'matematica', completed: false },
  { id: 5, title: 'Genética Básica', type: 'biologia', completed: false },
  { id: 6, title: 'Concordância Verbal', type: 'portugues', completed: false },
  { id: 7, title: 'Funções de 1º Grau', type: 'matematica', completed: false },
  { id: 8, title: 'Ecologia', type: 'biologia', completed: false },
  { id: 9, title: 'Sintaxe do Período', type: 'portugues', completed: false },
  { id: 10, title: 'Probabilidade', type: 'matematica', completed: false },
  { id: 11, title: 'Divisão Silábica', type: 'portugues', completed: false },
  { id: 12, title: 'Mitose e Meiose', type: 'biologia', completed: false },
];
// --- FIM DOS DADOS DE TESTE ---

export function HomeScreen() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  
  // CORREÇÃO: Usando PRETO ABSOLUTO (#000000) no modo escuro para OLED/AMOLED
  const backgroundColor = isDark ? '#121212' : '#FFFFFF';
  const statusBarStyle = isDark ? 'light-content' : 'dark-content';
  
  const statusBarProps = { level: 15, streak: 7, gems: 120, lives: 5 };
  
  const menuProps = {
    onPressHome: () => console.log('Navegar para Home'),
    onPressRedacao: () => console.log('Abrir Redação'),
    onPressCalculadora: () => console.log('Abrir Calculadora'),
    onPressPremium: () => console.log('Abrir Premium'),
    onPressSettings: () => console.log('Abrir Configurações'),
  };

  const handleMissionPress = (missionId: number) => {
    console.log(`Missão ${missionId} clicada!`);
  };
  
  return (
    // 1. CONTAINER PAI (View): Aplica a cor de fundo em 100% da tela física.
    <View style={[styles.fullScreenContainer, { backgroundColor }]}>
      
      {/* 2. CONTROLADOR DE BARRA DE STATUS */}
      <StatusBar 
        barStyle={statusBarStyle} 
        backgroundColor={backgroundColor} 
        // Translucent é importante para Android
        translucent={Platform.OS === 'android'}
      />

      {/* 3. CONTEÚDO ENVOLVIDO POR SafeAreaView: Garante o padding correto para os menus. */}
      <SafeAreaView style={styles.safeAreaContent}>
        
        {/* 1. COMPONENTE SUPERIOR FIXO (Colado no topo seguro) */}
        <TopStatusBar {...statusBarProps} /> 

        {/* 2. CONTEÚDO ROLÁVEL (Área de Missões) */}
        <ScrollView style={styles.contentArea}>
          
          <MissionsList 
            missions={initialMissions} 
            onMissionPress={handleMissionPress} 
          />
          
          <Text style={{ textAlign: 'center', padding: 20, color: isDark ? '#aaa' : '#888' }}>
            Explore a trilha de aprendizado!
          </Text>
          
        </ScrollView>
        
        {/* 3. COMPONENTE INFERIOR FIXO (Colado na base segura) */}
        <BottomMenu {...menuProps} />
        
      </SafeAreaView>

    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    // ESSENCIAL: O View que se estende de ponta a ponta
    flex: 1, 
  },
  safeAreaContent: {
    // Este SafeAreaView agora faz o trabalho de layout principal
    flex: 1,
    // Note: No iOS, o padding do notch é aplicado aqui.
  },
  contentArea: {
    flex: 1, 
  },
});