import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Alert, Dimensions, Platform, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
    // Removes whitespace from both ends of the string.
    trimmedMessageText = messageText.trim();
    Database.ref('messages/').push({
      message: trimmedMessageText,
      // Saves the current timestamp
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''});
    this.textInput.clear();
    // Navigates to the ConfirmationScreen
    this.state.navigation.navigate('Confirmation', { gifArray: this.state.gifArray });
  }

  // Handles the message alerts & validation
  handleMessage() {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      const messageText = this.state.messageText;
      const that = this;
      // Checks that the message is not empty and does not contain only spaces
      if ((messageText !== '') && (messageText.replace(/\s/g, '').length)) {
        const EmojiHeart = '\uD83D\uDC95';
        const EmojiNo = '\u274C';
        const EmojiYes = '\uD83C\uDF89';
        Alert.alert(
          'Send it?  ' + EmojiHeart,
          '',
          [
            {text: 'No  ' + EmojiNo, onPress: () => {that.setState({ loading: false });}},
            {text: 'Yes  ' + EmojiYes, onPress: () => {that.sendMessage(messageText); that.setState({ loading: false });}},
          ],
          { cancelable: false }
        );
      } else {
        const EmojiPen = '\u270F\uFE0F';
        Alert.alert('Message is empty  ' + EmojiPen);
        that.setState({ loading: false });
      }
    }
  }

  // Handles the close request
  handleClose(){
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      const messageText = this.state.messageText;
      const that = this;
      // Checks if the message field is empty
      if (messageText !== '') {
        const EmojiTrash = '\uD83D\uDDD1';
        const EmojiNo = '\u274C';
        const EmojiYes = '\u2705';
        Alert.alert(
          'Discard?  ' + EmojiTrash,
          '',
          [
            {text: 'No  ' + EmojiNo, onPress: () => {that.setState({ loading: false });}},
            {text: 'Yes  ' + EmojiYes, onPress: () => {that.state.navigation.navigate('Home'); that.setState({ loading: false });}},
          ],
          { cancelable: false }
        );
      } else {
        that.setState({ loading: true });
        that.state.navigation.navigate('Home');
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
            onPress={() => {this.handleMessage();}}
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
    marginTop: 15,
    maxHeight: (windowWidth-150),
    padding: 20,
    paddingTop: 20,
    paddingBottom: 0,
    width: (windowWidth-30),
    ...Platform.select({
      android: {
        marginTop: 35,
        textAlignVertical: 'top',
      },
    }),
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (windowWidth-30),
  },
});
