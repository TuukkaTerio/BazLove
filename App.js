import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import { StackNavigator } from 'react-navigation';
import HomeScreen from './src/components/screens/HomeScreen';
import MessageScreen from './src/components/screens/MessageScreen';
import ReadMessagesScreen from './src/components/screens/ReadMessagesScreen';
import ConfirmationScreen from './src/components/screens/ConfirmationScreen';
import ButtonContent from './src/components/ButtonContent';

const RootNavigator = StackNavigator({
  Home: {
    orientation: 'portrait',
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
  ReadMessages: {
    screen: ReadMessagesScreen,
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
