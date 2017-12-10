import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, View, Text, Image } from 'react-native';
import ButtonContent from './ButtonContent';
import RenderIf from './RenderIf';

export default class ConfirmationScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      navigation: this.props.navigation,
      gifUrl: '',
    };
  }

  componentWillMount() {
    const apiUrl = 'http://api.giphy.com/v1/stickers/random?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&limit=1&tag=happy';
    const request = new XMLHttpRequest();
    request.open('GET', apiUrl, true);
    request.onload = () => {
      if (request.status >= 200 && request.status < 400) {
        const parsedData = JSON.parse(request.responseText);
        this.setState({gifUrl: parsedData.data.image_original_url});
      } else {
        console.log('We reached our target server, but it returned an error');
      }
    };
    request.onerror = () => {
      console.log('There was a connection error of some sort');
    };
    request.send();
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
