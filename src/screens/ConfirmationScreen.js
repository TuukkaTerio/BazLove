import React, { Component } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ButtonContent from '../components/ButtonContent';
import RenderIf from '../components/helpers/RenderIf';
import { Colors } from '../components/helpers/Colors';
import BackgroundGradient from '../components/svg/BackgroundGradient';
import SvgCircles from '../components/svg/SvgCircles';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
      gifUrl: '',
      loading: false,
    };
  }

  componentWillMount() {
    // Gets a random gif from the array of gifs
    const randomUrl = this.state.gifArray[Math.floor(Math.random() * this.state.gifArray.length)].images.fixed_height_downsampled.url;
    this.setState({ gifUrl: randomUrl });
  }

  render() {
    return (
      <SafeAreaView style={styles.ConfirmationScreen}>
        <BackgroundGradient gradientColor={Colors['primary']}/>
        <SvgCircles circleSize={200} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={0} circleRight={300}/>
        <SvgCircles circleSize={500} circleColor={Colors['tertiary']} outputRange={['360deg', '0deg']} circleTop={-50} circleRight={300}/>
        <SvgCircles circleSize={450} circleColor={Colors['secondary']} outputRange={['0deg', '360deg']} circleTop={150} circleRight={430}/>
        // Renders the image only if there is an URL
        {RenderIf(this.state.gifUrl,
          <Image
            style={styles.Gif}
            source={{uri: this.state.gifUrl}}
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
    alignItems: 'center',
    backgroundColor: Colors['primary'],
    flex: 1,
    justifyContent: 'flex-end',
  },
  Gif: {
    height: 230,
    resizeMode: 'contain',
    width: 230,
  },
  TextThanks: {
    backgroundColor: 'transparent',
    color: Colors['white'],
    fontFamily: 'league-gothic',
    fontSize: 34,
    paddingTop: 10,
    textAlign: 'center',
  },
  TextGiphy: {
    backgroundColor: 'transparent',
    color: Colors['tertiary'],
    fontFamily: 'open-sans',
    fontSize: 13,
    marginBottom: 30,
    marginTop: 50,
    textAlign: 'center',
    width: 200,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
    width: 215,
  },
});
