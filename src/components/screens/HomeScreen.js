import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import RenderIf from '../RenderIf';
import ButtonContent from '../ButtonContent';
import Logo from '../Logo';
import SvgCircles from '../SvgCircles';
import BackgroundGradient from '../BackgroundGradient';
import { Colors } from '../Colors';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      screenContent: 'loading',
      navigation: this.props.navigation,
    };
  }

  // Gets an array of gifs and navigates to MessageScreen
  getGif() {
    const that = this;
    const apiUrl = 'http://api.giphy.com/v1/stickers/search?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&q=happy&limit=25';
    fetch(apiUrl)
    .then((resp) => resp.json())
    .then(function(jsonResp) {
      var respArray = jsonResp.data;
      that.state.navigation.navigate('Message', { gifArray: respArray });
    })
    .catch(function(error) {
      console.log(error);
    });
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ screenContent: 'home' });
      } else {
        this.setState({ screenContent: 'login' });
      }
    });
  }

  // Handles the log in
  handleLogin(email, password) {
    firebase.auth().signInWithEmailAndPassword(email, password)
    // Log in successful.
    .then(() => { this.setState({ screenContent: 'home' }); })
    // An error happened.
    .catch(() => {
      this.setState({ screenContent: 'login' });
      Alert.alert("User doesn't exist");
      this.emailInput.clear();
      this.passwordInput.clear();
    });
  }

  // Signs the user out from Firebase
  firebaseLogout() {
    firebase.auth().signOut().then(function() {
      // Log out successful.
    }).catch(function(error) {
      // An error happened.
      Alert.alert("Couldn't log out");
    });
  }

  // Handles the log out request
  handleLogout() {
    const EmojiBye = String.fromCodePoint(0x1F44B);
    const EmojiNo = String.fromCodePoint(0x274C);
    const EmojiYes = String.fromCodePoint(0x2705);
    Alert.alert(
      'Log out?  ' + EmojiBye,
      '',
      [
        {text: 'Yes  ' + EmojiYes, onPress: () => {this.firebaseLogout()}},
        {text: 'No  ' + EmojiNo},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.HomeScreen}>
        <BackgroundGradient/>
        {RenderIf(this.state.screenContent === 'home',
          <View>
            <SvgCircles circleSize={300} circleColor={Colors['purple']} outputRange={['0deg', '360deg']} circleTop={0} circleRight={215}/>
            <SvgCircles circleSize={260} circleColor={Colors['pinkDark']} outputRange={['360deg', '0deg']} circleTop={50} circleRight={220}/>
            <SvgCircles circleSize={160} circleColor={Colors['pinkLight']} outputRange={['360deg', '0deg']} circleTop={300} circleRight={250}/>
            <Logo/>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {this.state.navigation.navigate('ShowLove')}}
                title='SHOW'>
                <ButtonContent
                  btnContent = {'SHOW'}
                  btnColor = {'transparent'}
                  btnTextColor = {Colors['white']}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {this.getGif();}}
                title='SEND'>
                <ButtonContent
                  btnContent = {'SEND'}
                  btnColor = {Colors['white']}
                  btnTextColor = {Colors['yellow']}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>Messages are deleted on Mondays at 11 a.m. (UTC +1)</Text>
            <TouchableOpacity
              style={styles.Logout}
              onPress={() => {this.handleLogout()}}
              title='Logout'>
              <Text style={styles.LogoutText}>Logout</Text>
            </TouchableOpacity>
          </View>
        )}
        {RenderIf(this.state.screenContent === 'login',
          <View style={styles.LoginScreen}>
            <View style={styles.LoginContainer}>
              <TextInput
                style={styles.LoginInput}
                ref={input => { this.emailInput = input }}
                placeholder="Email"
                onChangeText={(userEmail) => this.setState({userEmail})}
                autoFocus = {true}
                keyboardType = {'email-address'}
                // Limits the maximum number of characters that can be entered.
                maxLength = {300}
                autoCapitalize = {'none'}
                autoCorrect = {false}
              />
              <TextInput
                style={styles.LoginInput}
                ref={input => { this.passwordInput = input }}
                placeholder="Password"
                onChangeText={(userPassword) => this.setState({userPassword})}
                // Limits the maximum number of characters that can be entered.
                maxLength = {300}
                autoCapitalize = {'none'}
                autoCorrect = {false}
                secureTextEntry = {true}
              />
              <TouchableOpacity
                onPress={() => {this.handleLogin(this.state.userEmail, this.state.userPassword)}}
                title='LOGIN'>
                <ButtonContent
                  btnContent = {'LOGIN'}
                  btnColor = {'transparent'}
                  btnTextColor = {Colors['white']}
                />
              </TouchableOpacity>
            </View>
          </View>
        )}
        {RenderIf(this.state.screenContent === 'loading',
          <View>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors['yellow'],
  },
  LoginContainer: {
    marginTop: 25,
    width: 280,
    flex: 1,
    alignItems: 'center',
  },
  LoginInput: {
    backgroundColor: Colors['white'],
    height: 65,
    fontSize: 16,
    padding: 20,
    paddingTop: 20,
    width: 280,
    lineHeight: 1.5,
    marginTop: 15,
  },
  ButtonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 215,
  },
  infoText: {
    width: 200,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: Colors['purple'],
  },
  Logout: {
    marginBottom: 40,
    backgroundColor: 'transparent',
  },
  LogoutText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
    color: Colors['purple'],
  },
});
