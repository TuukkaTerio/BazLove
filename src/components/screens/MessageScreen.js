import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../../firebaseConfig';
import { Alert, StyleSheet, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import ButtonContent from '../ButtonContent';
import SvgCircles from '../SvgCircles';
import BackgroundGradient from '../BackgroundGradient';
import { Colors } from '../Colors';

export default class MessageScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
      loading: false,
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
    Keyboard.dismiss;
    this.setState({ loading: false });
  }

  // Handles the message alerts & validation
  handleMessage(messageText) {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      if (messageText !== '') {
        const EmojiHeart = String.fromCodePoint(0x1F495);
        const EmojiNo = String.fromCodePoint(0x274C);
        const EmojiYes = String.fromCodePoint(0x1F389);
        Alert.alert(
          'Send it?  ' + EmojiHeart,
          '',
          [
            {text: 'No  ' + EmojiNo, onPress: () => {this.setState({ loading: false });}},
            {text: 'Yes  ' + EmojiYes, onPress: () => {this.sendMessage(messageText); this.setState({ loading: false });}},
          ],
          { cancelable: false }
        )
      } else {
        const EmojiPen = String.fromCodePoint(0x270F);
        Alert.alert('Message is empty  ' + EmojiPen);
        this.setState({ loading: false });
      }
    }
  }

  // Handles the close request
  handleClose(){
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      if (this.state.messageText !== '') {
        const EmojiTrash = String.fromCodePoint(0x1F5D1);
        const EmojiNo = String.fromCodePoint(0x274C);
        const EmojiYes = String.fromCodePoint(0x2705);
        Alert.alert(
          'Discard?  ' + EmojiTrash,
          '',
          [
            {text: 'No  ' + EmojiNo, onPress: () => {this.setState({ loading: false })}},
            {text: 'Yes  ' + EmojiYes, onPress: () => {this.state.navigation.navigate('Home'); this.setState({ loading: false });}},
          ],
          { cancelable: false }
        )
      } else {
        this.setState({ loading: true });
        this.state.navigation.navigate('Home');
        Keyboard.dismiss;
      }
    }
  }

  render() {
    return (
      <View style={styles.MessageScreen}>
        <BackgroundGradient/>
        <SvgCircles circleSize={500} circleColor={Colors['purple']} outputRange={['360deg', '0deg']} circleTop={-50} circleRight={500}/>
        <SvgCircles circleSize={400} circleColor={Colors['pinkDark']} outputRange={['0deg', '360deg']} circleTop={200} circleRight={330}/>
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
              btnTextColor = {Colors['white']}
              btnCustomWidth = {132}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.handleMessage(this.state.messageText)}}
            title='SEND'>
            <ButtonContent
              btnContent = {'SEND'}
              btnColor = {Colors['white']}
              btnTextColor = {Colors['pinkDark']}
              btnCustomWidth = {132}
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
    backgroundColor: Colors['yellow'],
  },
  TextInput: {
    backgroundColor: Colors['white'],
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
    width: 280,
  },
});
