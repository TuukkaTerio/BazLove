import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Alert, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import ButtonContent from './ButtonContent';

export default class MessageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { messageText: '' };
  }

  // Sends the message to the database and clears the input field
  sendMessage(messageText) {
    Database.ref('messages/').push({
      message: messageText,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''})
    this.textInput.clear()
  }

  // Handles the message alerts & validation
  handleMessage(messageText) {
    if (messageText !== '') {
      Alert.alert(
        'Send the message?',
        '',
        [
          {text: 'Nope', style: 'cancel'},
          {text: 'Yes', onPress: () => {this.sendMessage(messageText)}},
        ],
        { cancelable: false }
      )
    } else {
      Alert.alert('Your message is empty!')
    }
  }

  render() {
    return (
      <View style={styles.MessageScreen}>
        <TextInput
          style={{height: 100, fontSize: 42}}
          ref={input => { this.textInput = input }}
          placeholder="Spread the love!"
          onChangeText={(messageText) => this.setState({messageText})}
          multiline = {true}
          numberOfLines = {1}
          autoFocus = {true}
          // Limits the maximum number of characters that can be entered.
          maxLength = {1000}
        />
        <TouchableOpacity
          onPress={() => {this.handleMessage(this.state.messageText)}}
          title='Send message'>
          <ButtonContent
            btnContent = {'Send message'}
            btnColor = {'#49a38b'}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  MessageScreen: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
