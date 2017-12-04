import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/HomeScreen';
import MessageScreen from './src/components/MessageScreen';
import ShowLoveScreen from './src/components/ShowLoveScreen';
import ConfirmationScreen from './src/components/ConfirmationScreen';
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
