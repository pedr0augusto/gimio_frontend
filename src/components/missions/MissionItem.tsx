import React, { useRef, useEffect, useState } from 'react';
import {
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';

// TIPOS
export type MissionType =
  | 'matematica'
  | 'biologia'
  | 'portugues';

export interface Mission {
  id: number;
  title: string;
  type: MissionType;
  completed: boolean;
}

type MissionStatus = 'blocked' | 'next' | 'completed';

interface MissionItemProps {
  mission: Mission;
  status: MissionStatus;
  onPress?: () => void;
}

// ICONES ESTÁTICOS
const blockedIcon = require('../../assets/missions/missao_blocked.png');

const missionIcons: Record<string, any> = {
  matematica: require('../../assets/missions/matematica.png'),
  matematica_completed: require('../../assets/missions/matematica_completed.png'),

  biologia: require('../../assets/missions/biologia.png'),
  biologia_completed: require('../../assets/missions/biologia_completed.png'),

  portugues: require('../../assets/missions/portugues.png'),
  portugues_completed: require('../../assets/missions/portugues_completed.png'),
};

// PARTICULA
const starIcon = require('../../assets/particles/star.png');

interface Particle {
  id: number;
  animX: Animated.Value;
  animY: Animated.Value;
  animOpacity: Animated.Value;
}

export const MissionItem: React.FC<MissionItemProps> = ({
  mission,
  status,
  onPress,
}) => {
  const scaleValue = useRef(new Animated.Value(1)).current;

  const [particles, setParticles] = useState<Particle[]>([]);

  // Pulso contínuo para NEXT
  useEffect(() => {
    if (status === 'next') {
      const pulse = Animated.loop(
        Animated.sequence([
          Animated.timing(scaleValue, { toValue: 1.1, duration: 500, useNativeDriver: true }),
          Animated.timing(scaleValue, { toValue: 1, duration: 500, useNativeDriver: true }),
        ])
      );
      pulse.start();
      return () => pulse.stop();
    }
  }, [status]);

  // Função para disparar partículas
  const triggerParticles = () => {
    const directions = [
      { x: 0, y: -50 },
      { x: -40, y: -30 },
      { x: 40, y: -30 },
      { x: -30, y: 30 },
      { x: 30, y: 30 },
    ];

    const newParticles = directions.map((dir, index) => ({
      id: index,
      animX: new Animated.Value(0),
      animY: new Animated.Value(0),
      animOpacity: new Animated.Value(1),
      dir,
    }));

    setParticles(newParticles as any);

    newParticles.forEach((p, idx) => {
      Animated.parallel([
        Animated.timing(p.animX, { toValue: directions[idx].x, duration: 1000, useNativeDriver: true }),
        Animated.timing(p.animY, { toValue: directions[idx].y, duration: 1000, useNativeDriver: true }),
        Animated.timing(p.animOpacity, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ]).start();
    });

    // Limpa partículas após animação
    setTimeout(() => setParticles([]), 1200);
  };

  const handlePress = () => {
    // Animação de clique sempre
    Animated.sequence([
      Animated.timing(scaleValue, { toValue: 0.9, duration: 50, useNativeDriver: true }),
      Animated.spring(scaleValue, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true }),
    ]).start(() => {
      if (status === 'next') {
        onPress?.();
        triggerParticles();
      }
    });
  };

  // Seleção do ícone correto
  let iconSource;
  if (status === 'blocked') {
    iconSource = blockedIcon;
  } else if (status === 'next') {
    iconSource = missionIcons[mission.type];
  } else if (status === 'completed') {
    iconSource = missionIcons[`${mission.type}_completed`];
  }

  return (
    <View style={styles.wrapper}>
      <Animated.View style={[styles.animatedWrapper, { transform: [{ scale: scaleValue }] }]}>
        <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
          <Image source={iconSource} style={styles.missionIcon} />
        </TouchableOpacity>
      </Animated.View>

      {/* PARTICULAS */}
      {particles.map(p => (
        <Animated.Image
          key={p.id}
          source={starIcon}
          style={[
            styles.particle,
            {
              transform: [{ translateX: p.animX }, { translateY: p.animY }],
              opacity: p.animOpacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    width: 82,
    height: 82,
    justifyContent: 'center',
    alignItems: 'center',
  },
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
  particle: {
    position: 'absolute',
    width: 16,
    height: 16,
  },
});
