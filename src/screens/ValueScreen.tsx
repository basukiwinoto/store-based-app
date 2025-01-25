// src/App.js
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { AppProvider } from '../context/AppContext';
import DisplayValue from '../components/DisplayValue';
import UpdateValue from '../components/UpdateValue';

const ValueScreen = () => {
  return (
    <AppProvider>
      <SafeAreaView style={styles.container}>
        <DisplayValue />
        <UpdateValue />
      </SafeAreaView>
    </AppProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
});

export default ValueScreen;
