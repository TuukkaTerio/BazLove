import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/HomeScreen';
import MessageScreen from './src/components/screens/MessageScreen';
import ShowLoveScreen from './src/components/screens/ShowLoveScreen';
import ConfirmationScreen from './src/components/screens/ConfirmationScreen';
import ButtonContent from './src/components/ButtonContent';

const RootNavigator = StackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
    }
  },
  Message: {
    screen: MessageScreen,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
    }
  },
  ShowLove: {
    screen: ShowLoveScreen,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
    }
  },
  Confirmation: {
    screen: ConfirmationScreen,
    navigationOptions: {
      headerStyle: {
        display: 'none',
      },
    }
  },
});

export default RootNavigator;
