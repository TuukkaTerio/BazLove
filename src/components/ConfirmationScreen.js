import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from './ButtonContent';
import RenderIf from './RenderIf';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
    };
  }

  render() {
    // Gets a random gif from the array of gifs
    const randomGif = this.state.gifArray[Math.floor(Math.random() * this.state.gifArray.length)];
    const gifUrl = randomGif.images.fixed_height_downsampled.url;
    return (
      <View style={styles.ConfirmationScreen}>
        {RenderIf(gifUrl,
          <Image
            style={styles.Gif}
            source={{uri: gifUrl}}
          />
        )}
        <Text style={styles.TextThanks}>THANKS!</Text>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Message', { gifArray: this.state.gifArray })}}
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
  Gif: {
    height: 230,
    width: 230,
    resizeMode: 'contain',
  },
  TextThanks: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 34,
  },
  ButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 230,
  },
});
