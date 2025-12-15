import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

interface StatusItemProps {
  icon: ImageSourcePropType;
  value: string | number;
  textColor?: string;
}

export function StatusItem({ icon, value, textColor }: StatusItemProps) {
  return (
    <View style={styles.container}>
      <Image source={icon} style={styles.icon} />
      <Text style={[styles.text, textColor ? { color: textColor } : null]}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 30,      // tamanho maior para melhor visual
    height: 30,
    marginRight: 6,
    resizeMode: 'contain',
  },
  text: {
    fontSize: 16,
    fontWeight: '800',
  },
});
