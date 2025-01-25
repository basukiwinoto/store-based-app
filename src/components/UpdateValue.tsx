// src/components/UpdateValue.js
import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useAppContext } from '../context/AppContext';
import { ContextKey } from '../context/ContextModel';

const UpdateValue = () => {
  const { context, updateContext } = useAppContext();

  return (
    <View style={styles.section}> 
      <Button title="Update Name" onPress={() => updateContext(ContextKey.PROFILE, { ...context.profile, name: "John Smith" })} />
      <Button title="Update Age" onPress={() => updateContext(ContextKey.PROFILE, { ...context.profile, age: 28 })} />
      <Button title="Update Zip" onPress={() => updateContext(ContextKey.PROFILE, {  ...context.profile, address: {  ...context.profile.address, zip: 10101 }})} />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    margin: 20,
  },
});

export default UpdateValue;
