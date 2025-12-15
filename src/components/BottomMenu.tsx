import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

interface BottomMenuProps {
  onPressHome: () => void;
  onPressRedacao: () => void;
  onPressCalculadora: () => void;
  onPressPremium: () => void;
  onPressSettings: () => void;
}

export function BottomMenu({
  onPressHome,
  onPressRedacao,
  onPressCalculadora,
  onPressPremium,
  onPressSettings,
}: BottomMenuProps) {
  const [activeTab, setActiveTab] = useState<'home' | 'redacao' | 'calculadora' | 'premium' | 'settings'>('home');
  const colorScheme = useColorScheme(); 
  const isDark = colorScheme === 'dark';

  const tabs: typeof activeTab[] = ['home', 'redacao', 'calculadora', 'premium', 'settings'];

  const scaleAnim = tabs.reduce((acc, tab) => {
    acc[tab] = React.useRef(new Animated.Value(tab === activeTab ? 1.2 : 1)).current;
    return acc;
  }, {} as Record<typeof activeTab, Animated.Value>);

  useEffect(() => {
    tabs.forEach(tab => {
      Animated.spring(scaleAnim[tab], { toValue: tab === activeTab ? 1.2 : 1, useNativeDriver: true }).start();
    });
  }, [activeTab]);

  const handlePress = (tab: typeof activeTab, callback: () => void) => {
    setActiveTab(tab);
    callback();
  };

  const renderButton = (tab: typeof activeTab, icon: any, onPress: () => void) => {
    const isActive = activeTab === tab;

    const animatedStyle = {
      transform: [{ scale: scaleAnim[tab] }],
    } as any;

    return (
      <TouchableOpacity key={tab} onPress={() => handlePress(tab, onPress)} style={styles.button}>
        <Animated.View
          style={[
            styles.iconBackground,
            isActive && {
              backgroundColor: isDark ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)',
              borderWidth: 1,
              borderColor: isDark ? '#444' : '#c0c0c0',
            },
            animatedStyle,
          ]}
        >
          {/* OBS: O caminho das imagens foi omitido, use os caminhos corretos do seu projeto */}
          <Image source={icon} style={styles.icon} />
        </Animated.View>
      </TouchableOpacity>
    );
  };

  return (
    // SafeAreaView includes bottom and matches background so there is no white gap
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDark ? '#121212' : '#fff' }]} edges={['left', 'right', 'bottom']}> 
      <View style={[styles.divider, { backgroundColor: isDark ? '#444' : '#c0c0c0' }]} />
      <View style={[styles.container, { backgroundColor: isDark ? '#121212' : '#fff' }]}>
        {renderButton('home', require('../assets/icons/home.png'), onPressHome)}
        {renderButton('redacao', require('../assets/icons/redacao.png'), onPressRedacao)}
        {renderButton('calculadora', require('../assets/icons/calculadora.png'), onPressCalculadora)}
        {renderButton('premium', require('../assets/icons/premium.png'), onPressPremium)}
        {renderButton('settings', require('../assets/icons/settings.png'), onPressSettings)}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  divider: {
    height: 2,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 12,
  },
  button: {
    alignItems: 'center',
  },
  iconBackground: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
    width: 50,
    height: 50,
    overflow: 'visible',
  },
  icon: {
    width: 32,
    height: 32,
    resizeMode: 'contain',
  },
});