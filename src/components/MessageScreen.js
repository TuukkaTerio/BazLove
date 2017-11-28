import React, { Component } from 'react';
import Database from '../firebaseConfig';
import { StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import ButtonContent from './ButtonContent';

export default class MessageScreen extends React.Component {

  // Sends the message to the database
  _onPressSendLove() {
    Database.ref('messages/').push({
      message: 'Jag älskar alla!'
    });
  }

  render() {
    return (
      <View style={styles.MessageScreen}>
        <TextInput
          style={{height: 100, fontSize: 42}}
          placeholder="Spread the love!"
        />
        <TouchableOpacity
          onPress={this._onPressSendLove}
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
    justifyContent: 'center',
  },
});
