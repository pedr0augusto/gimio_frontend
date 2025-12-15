import React, { useRef } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated, // <--- Onde a mágica acontece
} from 'react-native';

// TIPOS
export type MissionType = 'matematica' | 'biologia' | 'portugues';

export interface Mission {
  id: number;
  title: string;
  type: MissionType;
  completed: boolean;
}

interface MissionItemProps {
  mission: Mission;
  onPress?: () => void;
}

const icons: Record<string, any> = {
  blocked: require('../../assets/missions/missao_blocked.png'),
  completed: require('../../assets/missions/missao_completed.png'),
  matematica: require('../../assets/missions/matematica.png'),
  biologia: require('../../assets/missions/biologia.png'),
  portugues: require('../../assets/missions/portugues.png'),
};

export const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  onPress,
}) => {
  // 1. Valor Animado para Escala
  const scaleValue = useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    // 2. Animação de Bounce (Diminui e Volta com Efeito Mola)
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.9, 
        duration: 80, 
        useNativeDriver: true,
      }),
      Animated.spring(scaleValue, {
        toValue: 1, 
        friction: 4, // Define a "soltura" da mola
        tension: 100, // Define a velocidade da mola
        useNativeDriver: true,
      }),
    ]).start(() => {
      if (onPress) {
        onPress();
      }
    });
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
  };

  return (
    // Aplica a animação de escala
    <Animated.View style={[styles.animatedWrapper, animatedStyle]}>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={1} 
        onPress={handlePress} // <--- ONDE A ANIMAÇÃO É INICIADA
      >
        {/* Conteúdo visual da missão (ícones e imagens) */}
        <Image
          source={mission.completed ? icons.completed : icons.blocked}
          style={styles.missionIcon}
        />
        <View style={styles.centerIconWrapper}>
          <Image
            source={icons[mission.type] ?? icons.matematica}
            style={styles.typeIcon}
          />
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  animatedWrapper: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
  missionIcon: {
    width: 80,
    height: 80,
  },
  centerIconWrapper: {
    position: 'absolute',
    width: 64,
    height: 64,
    justifyContent: 'center',
    alignItems: 'center',
  },
  typeIcon: {
    width: 28,
    height: 28,
  },
});