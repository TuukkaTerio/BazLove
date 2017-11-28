import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, View, Image } from 'react-native';
import ButtonContent from './ButtonContent';

const HomeScreen = ({ navigation }) => (
  <View style={styles.HomeScreen}>
    <Image
      source={require('../img/baz.png')}
      style={{width: 200, height: 200}}
    />
    <TouchableOpacity
      onPress={() => navigation.navigate('Message')}
      title='Send love'>
      <ButtonContent
        btnContent = {'Send love'}
        btnColor = {'#49a38b'}
      />
    </TouchableOpacity>
    <TouchableOpacity
      onPress={() => navigation.navigate('ShowLove')}
      title='Show love'>
      <ButtonContent
        btnContent = {'Show love'}
        btnColor = {'#331c48'}
      />
    </TouchableOpacity>
  </View>
);

export default HomeScreen;

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
