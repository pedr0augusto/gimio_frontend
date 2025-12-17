import React, { useEffect, useRef } from 'react';
import {
    Animated,
    Dimensions,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

export type MissionType = 'matematica' | 'biologia' | 'portugues'  | 'quimica'  | 'fisica';

interface MissionInfoModalProps {
  visible: boolean;
  missionId: number;
  title: string;
  type: MissionType;
  anchorY: number; 
  anchorX: number; 
  onStart: () => void;
  onClose: () => void;
}

const bubbleImages: Record<MissionType, any> = {
  matematica: require('../../assets/missions/matematica_info.png'),
  biologia: require('../../assets/missions/biologia_info.png'),
  portugues: require('../../assets/missions/portugues_info.png'),
  fisica: require('../../assets/missions/fisica_info.png'),
  quimica: require('../../assets/missions/quimica_info.png'),
};

const arrowImages: Record<MissionType, any> = {
  matematica: require('../../assets/missions/matematica_info_seta.png'),
  biologia: require('../../assets/missions/biologia_info_seta.png'),
  portugues: require('../../assets/missions/portugues_info_seta.png'),
  quimica: require('../../assets/missions/quimica_info_seta.png'),
  fisica: require('../../assets/missions/fisica_info_seta.png'),
};


const { width: SCREEN_WIDTH } = Dimensions.get('window');
const BUBBLE_WIDTH = 320;
const BUBBLE_HEIGHT = 190;

export const MissionInfoModal: React.FC<MissionInfoModalProps> = ({
  visible,
  missionId,
  title,
  type,
  anchorY,
  anchorX,
  onStart,
  onClose,
}) => {
  const scaleAnim = useRef(new Animated.Value(0.95)).current;
  const opacityAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(scaleAnim, { toValue: 1, friction: 7, useNativeDriver: true }),
        Animated.timing(opacityAnim, { toValue: 1, duration: 180, useNativeDriver: true }),
      ]).start();
    } else {
      scaleAnim.setValue(0.95);
      opacityAnim.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <View style={styles.overlay}>
      <TouchableOpacity style={StyleSheet.absoluteFill} activeOpacity={1} onPress={onClose} />

<>

  {/* SETA: acompanha a missão em X e Y */}
  <Animated.Image
    source={arrowImages[type]}
    style={{
      position: 'absolute',
      top: anchorY -80,            // posição da missão
      left: anchorX - 37,           // centraliza seta no X da missão
      width: 75,
      height: 40,
      resizeMode: 'contain',
      zIndex: 1,
      opacity: opacityAnim,
    }}
  />

  {/* CONTAINER DA BOLHA + TEXTO + BOTÃO: apenas Y acompanha a missão */}
  <Animated.View
    style={{
      position: 'absolute',
      top: anchorY - BUBBLE_HEIGHT +80, // só sobe/baixo com Y
      width: SCREEN_WIDTH,
      alignItems: 'center',              // fixa no centro X
      opacity: opacityAnim,
      zIndex: 10,
    }}
  >
    {/* BOLHA */}
    <Image
      source={bubbleImages[type]}
      style={{
        width: BUBBLE_WIDTH,
        height: BUBBLE_HEIGHT,
        resizeMode: 'contain',
        zIndex: 2,
      }}
    />

    {/* TEXTO */}
    <View
      style={{
        position: 'absolute',
        width: BUBBLE_WIDTH,
        height: BUBBLE_HEIGHT,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 3,
        paddingHorizontal: 28,
      }}
    >
      <Text style={styles.id}>#{missionId}</Text>
      <Text style={styles.title}>{title}</Text>
    </View>

    {/* BOTÃO */}
    <TouchableOpacity
      style={{
        marginTop: -45,           // logo abaixo da bolha
        width: 250,
        backgroundColor: '#ecececff',
        paddingVertical: 13,
        borderRadius: 15,
        alignItems: 'center',
        zIndex: 4,
      }}
      onPress={onStart}
    >
      <Text style={styles.buttonText}>Começar</Text>
    </TouchableOpacity>
  </Animated.View>

</>


    </View>
  );
};

const styles = StyleSheet.create({
  overlay: { ...StyleSheet.absoluteFillObject, zIndex: 999 },

  // Não precisa mexer na container
  container: { position: 'absolute', alignItems: 'center' },

  arrow: {
    width: 75,
    height: 40,
    resizeMode: 'contain',
    marginBottom: -120,
    zIndex: 0,
  },

  bubble: { width: BUBBLE_WIDTH, height: BUBBLE_HEIGHT, resizeMode: 'contain', zIndex: 1 },

  content: {
    position: 'absolute',
    width: BUBBLE_WIDTH,
    height: BUBBLE_HEIGHT,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    paddingHorizontal: 28,
  },

  // Ajusta posição e tamanho do ID aqui
  id: {
    position: 'absolute',
    top: 10,           // aumenta ou diminui para subir/abaixar
    left: 18,          // ajusta horizontalmente
    fontSize: 12,      // diminui o tamanho da fonte
    fontWeight: '800',
    color: '#1f1f1f',
  },

  // Ajusta o tamanho da fonte do título
  title: {
    fontSize: 18,       // diminui se estiver muito grande
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
  },

  button: {
    marginTop: 0,
    backgroundColor: '#58CC02',
    paddingHorizontal: 44,
    paddingVertical: 13,
    borderRadius: 15,
    elevation: 4,
  },

  buttonText: {
    color: '#252525ff',
    fontWeight: '900',
    fontSize: 16,
  },
});
