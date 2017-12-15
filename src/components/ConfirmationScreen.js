import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from './ButtonContent';
import RenderIf from './RenderIf';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      gifUrl: this.props.navigation.state.params.gifUrl,
      navigation: this.props.navigation,
    };
  }

  render() {
    return (
      <View style={styles.ConfirmationScreen}>
        {RenderIf(this.state.gifUrl,
          <Image
            style={{width: 250, height: 250}}
            source={{uri: this.state.gifUrl}}
          />
        )}
        <Text style={styles.TextThanks}>THANKS!</Text>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Message')}}
            title='SEND MORE'>
            <ButtonContent
              btnContent = {'SEND MORE'}
              btnColor = {'#49a38b'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Home')}}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'#331c48'}
            />
          </TouchableOpacity>
        </View>
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
  TextThanks: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 22,
  },
  ButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 230,
  },
});
