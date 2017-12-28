import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { SafeAreaView, Alert, StyleSheet, TouchableOpacity, View, TextInput, Keyboard } from 'react-native';
import ButtonContent from '../components/ButtonContent';
import BackgroundGradient from '../components/svg/BackgroundGradient';
import { Colors } from '../components/helpers/Colors';
import { Font } from 'expo';

export default class MessageScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  };

  constructor(props) {
    super(props);
    this.state = {
      messageText: '',
      navigation: this.props.navigation,
      gifArray: this.props.navigation.state.params.gifArray,
      loading: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
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
      if ((messageText !== '') && (messageText.replace(/\s/g, '').length)) {
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
      <SafeAreaView style={styles.MessageScreen}>
        <BackgroundGradient gradientColor={Colors['secondary']}/>
        <TextInput
          style={[styles.TextInput, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}
          ref={input => { this.textInput = input }}
          placeholder='Spread the love!'
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
              btnTextColor = {Colors['secondary']}
              btnCustomWidth = {132}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MessageScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: Colors['secondary'],
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
