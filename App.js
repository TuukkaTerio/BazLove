import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, AppRegistry, Image } from 'react-native';
import Logo from './src/Components/Logo';
import MessageInput from './src/Components/MessageInput';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Baz</Text>
        <Text>Love</Text>
        <Logo/>
        <MessageInput/>
        <Button
          onPress={() => this._handlePress()}
          title="Send"
        >
          Send
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
