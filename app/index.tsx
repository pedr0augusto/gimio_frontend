// app/index.tsx

import React from 'react';
import { StyleSheet, View } from 'react-native';
// Certifique-se de que o caminho está correto para sua estrutura
import { HomeScreen } from '../src/screens/HomeScreen'; 

export default function Index() { 
  return (
    <View style={styles.container}>
      {/* Certifique-se de que não há NENHUMA string de texto solta aqui. */}
      <HomeScreen /> 
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    // Garante que o fundo não seja branco por baixo (já discutido)
  },
});