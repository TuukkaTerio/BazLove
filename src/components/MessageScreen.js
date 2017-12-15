import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Alert, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import ButtonContent from './ButtonContent';

export default class MessageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      navigation: this.props.navigation,
      apiUrl: '',
    };
  }

  // Changes the tag that is used to get a random gif
  getNewTag() {
    const url = 'http://api.giphy.com/v1/gifs/random?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&tag=';
    const tagArray = ['cat', 'cute-cat', 'funny-cat'];
    let tag = tagArray[Math.floor(Math.random() * tagArray.length)];
    this.setState({apiUrl: url + tag});
  }

  // Gets the gif url and navigates to ConfirmationScreen
  getGif() {
    const nav = this.state.navigation;
    const apiUrl = this.state.apiUrl;
    fetch(apiUrl)
    .then((resp) => resp.json())
    .then(function(jsonResp) {
      nav.navigate('Confirmation', { gifUrl: jsonResp.data.fixed_height_downsampled_url });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  // Sends the message to Firebase, clears the input field & calls getGif()
  sendMessage(messageText) {
    Database.ref('messages/').push({
      message: messageText,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''});
    this.textInput.clear();
    this.getNewTag();
    this.getGif();
  }

  // Handles the message alerts & validation
  handleMessage(messageText) {
    if (messageText !== '') {
      const EmojiHeart = String.fromCodePoint(0x1F495);
      const EmojiNo = String.fromCodePoint(0x274C);
      const EmojiYes = String.fromCodePoint(0x1F389);
      Alert.alert(
        'Send it?  ' + EmojiHeart,
        '',
        [
          {text: 'No  ' + EmojiNo, style: 'cancel'},
          {text: 'Yes  ' + EmojiYes, onPress: () => {this.sendMessage(messageText)}},
        ],
        { cancelable: false }
      )
    } else {
      const EmojiPen = String.fromCodePoint(0x270F);
      Alert.alert('Message is empty  ' + EmojiPen)
    }
  }

  render() {
    return (
      <View style={styles.MessageScreen}>
        <TextInput
          style={styles.TextInput}
          ref={input => { this.textInput = input }}
          placeholder="Spread the love!"
          onChangeText={(messageText) => this.setState({messageText})}
          multiline = {true}
          numberOfLines = {10}
          autoFocus = {true}
          // Limits the maximum number of characters that can be entered.
          maxLength = {1000}
        />
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.state.navigation.navigate('Home')}}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'#331c48'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.handleMessage(this.state.messageText)}}
            title='SEND'>
            <ButtonContent
              btnContent = {'SEND'}
              btnColor = {'#49a38b'}
            />
          </TouchableOpacity>
        </View>
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
  TextInput: {
    backgroundColor: '#fff',
    fontSize: 16,
    padding: 20,
    paddingTop: 20,
    width: 280,
    marginTop: 40,
    height: 180,
    maxHeight: 180,
    lineHeight: 1.5,
  },
  ButtonContainer: {
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 215,
  },
});
