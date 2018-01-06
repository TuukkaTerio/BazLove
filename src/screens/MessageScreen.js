import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Alert, Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Keyboard, View } from 'react-native';
import ButtonContent from '../components/ButtonContent';
import { Colors } from '../components/helpers/Colors';
import BackgroundGradient from '../components/svg/BackgroundGradient';

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

  componentDidMount() {
    this.getGif();
  }

  // Gets an array of gifs from Giphy
  getGif() {
    // Checks if there already is an array of gifs
    if (this.state.gifArray.length != 0) {
      return;
    } else {
      const that = this;
      const tagArray = ['happy', 'love', 'party'];
      // Gets a random tag from the tagArray
      let tag = tagArray[Math.floor(Math.random() * tagArray.length)];
      const apiUrl = 'http://api.giphy.com/v1/stickers/search?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&q=' + tag + '&limit=25';
      fetch(apiUrl)
      .then((resp) => resp.json())
      .then(function(jsonResp) {
        let respArray = jsonResp.data;
        that.setState({ gifArray: respArray });
      })
      .catch(function(error) {
        console.log(error);
      });
    }
  }

  // Sends the message to Firebase, clears the input field and navigates to ConfirmationScreen
  sendMessage(messageText) {
    Database.ref('messages/').push({
      message: messageText,
      // Saves the current timestamp
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''});
    this.textInput.clear();
    // Navigates to the ConfirmationScreen
    this.state.navigation.navigate('Confirmation', { gifArray: this.state.gifArray });
    Keyboard.dismiss;
  }

  // Handles the message alerts & validation
  handleMessage(messageText) {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      // Checks that the message is not empty and does not contain only spaces
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
      Keyboard.dismiss;
      // Checks if the message field is empty
      if (this.state.messageText !== '') {
        const EmojiTrash = String.fromCodePoint(0x1F5D1);
        const EmojiNo = String.fromCodePoint(0x274C);
        const EmojiYes = String.fromCodePoint(0x2705);
        Alert.alert(
          'Discard?  ' + EmojiTrash,
          '',
          [
            {text: 'No  ' + EmojiNo, onPress: () => {this.setState({ loading: false });}},
            {text: 'Yes  ' + EmojiYes, onPress: () => {this.state.navigation.navigate('Home'); this.setState({ loading: false }); Keyboard.dismiss;}},
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
          style={styles.TextInput}
          ref={input => { this.textInput = input }}
          placeholder='Spread the love!'
          onChangeText={(messageText) => this.setState({messageText})}
          multiline = {true}
          numberOfLines = {10}
          autoFocus = {true}
          maxLength = {1000}
          underlineColorAndroid = 'rgba(0,0,0,0)'
        />
        <View style={styles.ButtonContainer}>
          <TouchableOpacity
            onPress={() => {this.handleClose();}}
            title='CLOSE'>
            <ButtonContent
              btnContent = {'CLOSE'}
              btnColor = {'transparent'}
              btnTextColor = {Colors['white']}
              btnCustomWidth = {((windowWidth-45)/2)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.handleMessage(this.state.messageText)}}
            title='SEND'>
            <ButtonContent
              btnContent = {'SEND'}
              btnColor = {Colors['white']}
              btnTextColor = {Colors['secondary']}
              btnCustomWidth = {((windowWidth-45)/2)}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const windowWidth = Dimensions.get("window").width;

const styles = StyleSheet.create({
  MessageScreen: {
    alignItems: 'center',
    backgroundColor: Colors['secondary'],
    flex: 1,
    justifyContent: 'flex-start',
  },
  TextInput: {
    backgroundColor: '#fff',
    fontFamily: 'open-sans',
    fontSize: 16,
    height: (windowWidth-150),
    lineHeight: 1.5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    maxHeight: (windowWidth-150),
    padding: 20,
    paddingTop: 20,
    paddingBottom: 0,
    textAlignVertical: 'top',
    width: (windowWidth-30),
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (windowWidth-30),
  },
});
