import React, { Component } from 'react';
import { AppRegistry, View, Button } from 'react-native';

export default class CustomButton extends Component {
  render() {
    return (
      <View>
        <Button
          onPress={() => { Alert.alert('hej!')}}
          title={this.props.content}
        />
      </View>
    );
  }
}
