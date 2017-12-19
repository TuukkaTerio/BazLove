import React, { Component } from 'react';
import { Text } from 'react-native';
import { Colors } from './Colors';

export default class Loader extends Component {
  render() {
    const LoaderStyle = {
      marginTop: 100,
    }
    return (
      <Text style={LoaderStyle}>LOADER</Text>
    );
  }
}
