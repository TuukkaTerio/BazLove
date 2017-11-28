import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

const ShowLoveScreen = ({ navigation }) => (
  <View style={styles.ShowLoveScreen}>
    <Text>Show Love</Text>
  </View>
);

export default ShowLoveScreen;

const styles = StyleSheet.create({
  ShowLoveScreen: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
