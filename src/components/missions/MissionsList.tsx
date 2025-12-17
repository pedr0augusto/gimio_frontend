import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import { MissionItem, Mission } from './MissionItem';

interface MissionsListProps {
  missions: Mission[];
  onMissionPress: (missionId: number, ref: React.RefObject<View | null>) => void;
}

const ITEM_WIDTH = 82;
const OFFSETS_PATTERN_LEFT = [50, 55, 60, 55, 50, 45, 40, 45];

export const MissionsList: React.FC<MissionsListProps> = ({ missions, onMissionPress }) => {
  const nextMissionIndex = missions.findIndex(m => !m.completed);

  return (
    <View style={styles.container}>
      {missions.map((mission, index) => {
        let status: 'blocked' | 'next' | 'completed';
        if (mission.completed) status = 'completed';
        else if (index === nextMissionIndex) status = 'next';
        else status = 'blocked';

        const missionRef = useRef<View | null>(null);

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
              ref={missionRef}
              mission={mission}
              status={status}
              onPress={() => onMissionPress(mission.id, missionRef)}
            />
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { paddingVertical: 30, width: '100%' },
  missionWrapper: { alignItems: 'center', marginVertical: 10, width: ITEM_WIDTH },
});
