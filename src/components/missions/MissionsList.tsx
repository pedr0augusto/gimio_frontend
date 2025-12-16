import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MissionItem, Mission } from './MissionItem';

interface MissionsListProps {
  missions: Mission[];
  onMissionPress: (missionId: number) => void;
}

const ITEM_WIDTH = 82;
const OFFSETS_PATTERN_LEFT = [50, 55, 60, 55, 50, 45, 40, 45];

export const MissionsList: React.FC<MissionsListProps> = ({
  missions,
  onMissionPress,
}) => {
  // acha a primeira missão não concluída
  const nextMissionIndex = missions.findIndex(m => !m.completed);

  return (
    <View style={styles.container}>
      {missions.map((mission, index) => {
        let status: 'blocked' | 'next' | 'completed';

        if (mission.completed) {
          status = 'completed';
        } else if (index === nextMissionIndex) {
          status = 'next';
        } else {
          status = 'blocked';
        }

        return (
          <View
            key={mission.id}
            style={[
              styles.missionWrapper,
              {
                marginLeft: `${OFFSETS_PATTERN_LEFT[index % OFFSETS_PATTERN_LEFT.length]}%`,
                transform: [{ translateX: -ITEM_WIDTH / 2 }],
              },
            ]}
          >
            <MissionItem
              mission={mission}
              status={status}
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
    width: ITEM_WIDTH,
  },
});
