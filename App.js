import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import MessageScreen from './src/components/MessageScreen';
import ShowLoveScreen from './src/components/ShowLoveScreen';
import ButtonContent from './src/components/ButtonContent';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerTintColor: '#ffd92a',
      headerStyle: {
        backgroundColor: '#331c48',
      },
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions: {
      headerTintColor: '#331c48',
      headerStyle: {
        backgroundColor: '#ffd92a',
      },
    }
  },
  ShowLove: {
    screen: ShowLoveScreen,
    navigationOptions: {
      headerTintColor: '#331c48',
      headerStyle: {
        backgroundColor: '#ffd92a',
      },
    }
  },
});

export default RootNavigator;
