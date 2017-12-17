import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../../firebaseConfig';
import { Alert, StyleSheet, TouchableOpacity, View, TextInput } from 'react-native';
import ButtonContent from '../ButtonContent';
import SvgCircles from '../SvgCircles';
import BackgroundGradient from '../BackgroundGradient';

export default class MessageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
    };
  }

  // Sends the message to Firebase, clears the input field and navigates to ConfirmationScreen
  sendMessage(messageText) {
    Database.ref('messages/').push({
      message: messageText,
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''});
    this.textInput.clear();
    this.state.navigation.navigate('Confirmation', { gifArray: this.state.gifArray });
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

  // Handles the close request
  handleClose(){
    if (this.state.messageText !== '') {
      const EmojiTrash = String.fromCodePoint(0x1F5D1);
      const EmojiNo = String.fromCodePoint(0x274C);
      const EmojiYes = String.fromCodePoint(0x2705);
      Alert.alert(
        'Discard?  ' + EmojiTrash,
        '',
        [
          {text: 'No  ' + EmojiNo},
          {text: 'Yes  ' + EmojiYes, onPress: () => {this.state.navigation.navigate('Home')}},
        ],
        { cancelable: false }
      )
    } else {
      this.state.navigation.navigate('Home');
    }
  }

  render() {
    return (
      <View style={styles.MessageScreen}>
        <BackgroundGradient/>
        <SvgCircles circleSize={500} circleColor={'#331c48'} outputRange={['360deg', '0deg']} circleTop={-50} circleRight={500}/>
        <SvgCircles circleSize={400} circleColor={'#D04CC0'} outputRange={['0deg', '360deg']} circleTop={200} circleRight={330}/>
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
            onPress={() => {this.handleClose()}}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'transparent'}
              btnTextColor = {'#fff'}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.handleMessage(this.state.messageText)}}
            title='SEND'>
            <ButtonContent
              btnContent = {'SEND'}
              btnColor = {'#fff'}
              btnTextColor = {'#D04CC0'}
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
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '#ffd92a',
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
