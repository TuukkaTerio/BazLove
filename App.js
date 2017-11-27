import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import MessageScreen from './src/components/MessageScreen';
import ShowLoveScreen from './src/components/ShowLoveScreen';
import ButtonContent from './src/components/ButtonContent';

// Screens for React Navigation

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
  },
  Message: {
    screen: MessageScreen,
  },
  ShowLove: {
    screen: ShowLoveScreen,
  },
});

export default RootNavigator;
