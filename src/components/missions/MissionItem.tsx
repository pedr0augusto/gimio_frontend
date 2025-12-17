import React, { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View } from 'react-native';

export type MissionType = 'matematica' | 'biologia' | 'portugues'  | 'quimica'  | 'fisica';

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

// Ícones da missão
const blockedIcon = require('../../assets/missions/missao_blocked.png');
const missionIcons: Record<string, any> = {
  matematica: require('../../assets/missions/matematica.png'),
  matematica_completed: require('../../assets/missions/matematica_completed.png'),
  biologia: require('../../assets/missions/biologia.png'),
  biologia_completed: require('../../assets/missions/biologia_completed.png'),
  portugues: require('../../assets/missions/portugues.png'),
  portugues_completed: require('../../assets/missions/portugues_completed.png'),
  quimica: require('../../assets/missions/quimica.png'),
  quimica_completed: require('../../assets/missions/quimica_completed.png'),
  fisica: require('../../assets/missions/fisica.png'),
  fisica_completed: require('../../assets/missions/fisica_completed.png'),
};

export const MissionItem = forwardRef<View, MissionItemProps>(
  ({ mission, status, onPress }, ref) => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const handlePress = () => {
      Animated.sequence([
        Animated.timing(scaleValue, { toValue: 0.9, duration: 50, useNativeDriver: true }),
        Animated.spring(scaleValue, { toValue: 1, friction: 4, tension: 100, useNativeDriver: true }),
      ]).start(() => {
        if (status === 'next' && onPress) onPress();
      });
    };

    let iconSource;
    if (status === 'blocked') iconSource = blockedIcon;
    else if (status === 'next') iconSource = missionIcons[mission.type];
    else iconSource = missionIcons[`${mission.type}_completed`];

    return (
      <View ref={ref} style={styles.wrapper}>
        <Animated.View style={[styles.animatedWrapper, { transform: [{ scale: scaleValue }] }]}>
          <TouchableOpacity style={styles.container} activeOpacity={1} onPress={handlePress}>
            <Image source={iconSource} style={{ width: 80, height: 80 }} />
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  }
);

const styles = StyleSheet.create({
  wrapper: { width: 82, height: 82, justifyContent: 'center', alignItems: 'center', position: 'relative' },
  animatedWrapper: { width: 82, height: 82, justifyContent: 'center', alignItems: 'center' },
  container: { width: 82, height: 82, justifyContent: 'center', alignItems: 'center' },
});
