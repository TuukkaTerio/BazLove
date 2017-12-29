import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Alert, Dimensions, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Keyboard, View } from 'react-native';
import { Font } from 'expo';
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
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
    this.getGif();
  }

  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  };

  // Gets an array of gifs
  getGif() {
    if (this.state.gifArray.length != 0) {
      return;
    } else {
      const that = this;
      const tagArray = ['happy', 'love', 'party'];
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
      timestamp: firebase.database.ServerValue.TIMESTAMP,
    });
    this.setState({messageText: ''});
    this.textInput.clear();
    this.state.navigation.navigate('Confirmation', { gifArray: this.state.gifArray });
    Keyboard.dismiss;
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
              btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
              btnCustomWidth = {((Dimensions.get("window").width-45)/2)}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {this.handleMessage(this.state.messageText)}}
            title='SEND'>
            <ButtonContent
              btnContent = {'SEND'}
              btnColor = {Colors['white']}
              btnTextColor = {Colors['secondary']}
              btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
              btnCustomWidth = {((Dimensions.get("window").width-45)/2)}
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  MessageScreen: {
    alignItems: 'center',
    backgroundColor: Colors['secondary'],
    flex: 1,
    justifyContent: 'flex-start',
  },
  TextInput: {
    backgroundColor: Colors['white'],
    fontSize: 16,
    height: 180,
    lineHeight: 1.5,
    marginLeft: 15,
    marginRight: 15,
    marginTop: 30,
    maxHeight: 180,
    padding: 20,
    paddingTop: 20,
    width: (Dimensions.get("window").width-30),
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: (Dimensions.get("window").width-30),
  },
});
