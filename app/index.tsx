import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import HomeScreen from '../src/screens/HomeScreen';

export default function Index() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <HomeScreen />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f7f7f7',
  },
});
