// src/components/DisplayValue.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';

const DisplayValue = () => {
  const { context } = useAppContext();
  const { value, secondValue, profile } = context;

  return (
    <View style={styles.section}> 
      <Text style={styles.text}>Current Value: {value}</Text>
      <Text style={styles.text}>Second Value: {secondValue}</Text>
      <Text style={styles.text}>Name: {profile.name}</Text>
      <Text style={styles.text}>Age: {profile.age}</Text>
      <Text style={styles.text}>Zip: {profile.address.zip}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 20,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default DisplayValue;

