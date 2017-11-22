import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, AppRegistry, Image } from 'react-native';
import Logo from './src/Components/Logo';
import MessageInput from './src/Components/MessageInput';
import CustomButton from './src/Components/CustomButton';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      content : 'send'
    };
  }
  render() {
    return (
      <View style={styles.container}>
        <Logo/>
        <MessageInput/>
        <CustomButton content={this.state.content}/>
        <CustomButton content={this.state.content}/>
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
