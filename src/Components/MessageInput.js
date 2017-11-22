import React, { Component } from 'react';
import { AppRegistry, Text, TextInput, View } from 'react-native';

export default class MessageInput extends Component {
  render() {
    return (
      <View>
        <TextInput
          style={{height: 100, fontSize: 42}}
          placeholder="Spread the love!"
        />
      </View>
    );
  }
}
