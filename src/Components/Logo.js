import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('../img/baz.png')}
          style={{width: 150, height: 150}}
        />
      </View>
    );
  }
}
