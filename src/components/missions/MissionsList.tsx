import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MissionItem, Mission } from './MissionItem'; 

// Adicionei a interface MissionsListProps completa (incluindo onMissionPress)
// para evitar o erro de tipagem que tivemos anteriormente.
interface MissionsListProps {
  missions: Mission[];
  onMissionPress: (missionId: number) => void;
}

const ITEM_WIDTH = 82;
// Padrão de offsets (em % da largura total): [50, 55, 60, 55, 50, 45, 40, 45]
const OFFSETS_PATTERN_LEFT = [50, 55, 60, 55, 50, 45, 40, 45]; 

export const MissionsList: React.FC<MissionsListProps> = ({ missions, onMissionPress }) => {
  const offsetsLength = OFFSETS_PATTERN_LEFT.length;

  const getItemMarginPercent = (index: number) => {
    return OFFSETS_PATTERN_LEFT[index % offsetsLength];
  };

  return (
    <View style={styles.container}>
      {missions.map((mission, index) => {
        const currentOffsetPercent = getItemMarginPercent(index);
        
        // CORREÇÃO DE TIPAGEM: Removemos a variável itemStyle separada 
        // e aplicamos o objeto de estilo dinâmico diretamente na array 'style'.
        
        return (
          <View
            key={mission.id}
            style={[
              styles.missionWrapper,
              { 
                // A string de porcentagem é aceita aqui
                marginLeft: `${currentOffsetPercent}%`,
                // Aplicamos o transform
                transform: [{ translateX: -ITEM_WIDTH / 2 }],
              }
            ]}
          >
            <MissionItem 
                mission={mission} 
                onPress={() => onMissionPress(mission.id)} 
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 30,
    width: '100%',
  },
  missionWrapper: {
    alignItems: 'center',
    marginVertical: 10, 
    position: 'relative', 
    width: ITEM_WIDTH, 
  },
});