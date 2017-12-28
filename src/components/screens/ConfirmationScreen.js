import React, { Component } from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from '../ButtonContent';
import RenderIf from '../RenderIf';
import BackgroundGradient from '../BackgroundGradient';
import SvgCircles from '../SvgCircles';
import { Colors } from '../Colors';
import { Font } from 'expo';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
      loading: false,
    };
  }

  componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    Font.loadAsync({
      'open-sans': require('../../fonts/OpenSans-Regular.ttf'),
      'league-gothic': require('../../fonts/LeagueGothic-Regular.otf'),
    });
  }

  render() {
    // Gets a random gif from the array of gifs
    const randomGif = this.state.gifArray[Math.floor(Math.random() * this.state.gifArray.length)];
    const gifUrl = randomGif.images.fixed_height_downsampled.url;
    return (
      <SafeAreaView style={styles.ConfirmationScreen}>
        <BackgroundGradient gradientColor={Colors['primary']}/>
        <SvgCircles circleSize={200} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={0} circleRight={300}/>
        <SvgCircles circleSize={500} circleColor={Colors['tertiary']} outputRange={['360deg', '0deg']} circleTop={-50} circleRight={300}/>
        <SvgCircles circleSize={450} circleColor={Colors['secondary']} outputRange={['0deg', '360deg']} circleTop={150} circleRight={430}/>
        {RenderIf(gifUrl,
          <Image
            style={styles.Gif}
            source={{uri: gifUrl}}
          />
        )}
        <Text style={styles.TextThanks}>THANKS!</Text>
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {
              if(this.state.loading) {
                return;
              } else {
                this.setState({ loading: true });
                this.state.navigation.navigate('Home');
              }
            }}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'transparent'}
              btnTextColor = {Colors['white']}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              if(this.state.loading) {
                return;
              } else {
                this.setState({ loading: true });
                this.state.navigation.navigate('Message', { gifArray: this.state.gifArray });
              }
            }}
            title='SEND MORE'>
            <ButtonContent
              btnContent = {'SEND MORE'}
              btnColor = {Colors['white']}
              btnTextColor = {Colors['secondary']}
            />
          </TouchableOpacity>
        </View>
        <Text style={styles.TextGiphy}>Powered By GIPHY</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ConfirmationScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors['primary'],
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
    fontFamily: 'league-gothic',
    fontSize: 34,
    color: Colors['white'],
  },
  TextGiphy: {
    fontSize: 13,
    width: 200,
    marginTop: 60,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: Colors['secondary'],
    fontFamily: 'open-sans',
  },
  ButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 215,
  },
});
