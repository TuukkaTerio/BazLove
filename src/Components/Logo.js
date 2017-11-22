import React, { Component } from 'react';
import { AppRegistry, View, Image } from 'react-native';

export default class Logo extends Component {
  render() {
    return (
      <View>
        <Image
          source={require('../Images/baz.png')}
          style={{width: 90, height: 90}}
        />
      </View>
    );
  }
}
