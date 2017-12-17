import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from '../ButtonContent';
import RenderIf from '../RenderIf';
import BackgroundGradient from '../BackgroundGradient';
import SvgCircles from '../SvgCircles';

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
        <BackgroundGradient/>
        <SvgCircles circleSize={200} circleColor={'#331c48'} outputRange={['360deg', '0deg']} circleTop={0} circleRight={300}/>
        <SvgCircles circleSize={500} circleColor={'#FF62CA'} outputRange={['360deg', '0deg']} circleTop={-50} circleRight={300}/>
        <SvgCircles circleSize={450} circleColor={'#D04CC0'} outputRange={['0deg', '360deg']} circleTop={150} circleRight={430}/>
        {RenderIf(gifUrl,
          <Image
            style={styles.Gif}
            source={{uri: gifUrl}}
          />
        )}
        <Text style={styles.TextThanks}>THANKS!</Text>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Home')}}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'transparent'}
              btnTextColor = {'#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Message', { gifArray: this.state.gifArray })}}
            title='SEND MORE'>
            <ButtonContent
              btnContent = {'SEND MORE'}
              btnColor = {'#fff'}
              btnTextColor = {'#D04CC0'}
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffd92a',
  },
  Gif: {
    height: 230,
    width: 230,
    resizeMode: 'contain',
  },
  TextThanks: {
    backgroundColor: 'transparent',
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'HelveticaNeue-CondensedBold',
    fontSize: 34,
    color: '#fff',
  },
  ButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 230,
  },
});
