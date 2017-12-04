import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from './ButtonContent';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      gifUrl: 'https://i.giphy.com/3ohhwj5q17ISuJnBiU.gif',
    };
  }

  componentDidMount() {
    getGif = (event) => {
      let fetchUrl = 'http://api.giphy.com/v1/stickers/trending?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&limit=1';
    }
  }

  render() {
    console.log(this.state.gifUrl)
    return (
      <View style={styles.ConfirmationScreen}>
        <Image
          style={{width: 250, height: 250}}
          source={{uri: this.state.gifUrl}}
        />
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
