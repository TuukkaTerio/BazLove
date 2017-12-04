import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import ButtonContent from './ButtonContent';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <View style={styles.ConfirmationScreen}>
        <Text>TACK!</Text>
        <TouchableOpacity
          onPress={() => this.state.navigation.navigate('Message')}
          title='Send more'>
          <ButtonContent
            btnContent = {'Send more'}
            btnColor = {'#49a38b'}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {this.state.navigation.navigate('Home')}}
          title='Close'>
          <ButtonContent
            btnContent = {'Close'}
            btnColor = {'#331c48'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ConfirmationScreen: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
