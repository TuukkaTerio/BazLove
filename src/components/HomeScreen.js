import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, TouchableOpacity, StyleSheet, View, Image, Text, TextInput } from 'react-native';
import RenderIf from './RenderIf';
import ButtonContent from './ButtonContent';

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
    Alert.alert(
      'Log out?',
      '',
      [
        {text: 'Yes', onPress: () => {this.firebaseLogout()}},
        {text: 'Nope', style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View style={styles.HomeScreen}>
        {RenderIf(this.state.screenContent === 'home',
          <View style={styles.HomeScreen}>
            <Image
              source={require('../img/baz.png')}
              style={{width: 200, height: 200}}
            />
            <TouchableOpacity
              onPress={() => this.state.navigation.navigate('Message')}
              title='Send'>
              <ButtonContent
                btnContent = {'Send'}
                btnColor = {'#49a38b'}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.state.navigation.navigate('ShowLove')}
              title='Show'>
              <ButtonContent
                btnContent = {'Show'}
                btnColor = {'#ffd92a'}
              />
            </TouchableOpacity>
            <Text>Messages are deleted on Mondays at 11 a.m.</Text>
            <TouchableOpacity
              onPress={() => {this.handleLogout()}}
              title='Logout'>
              <ButtonContent
                btnContent = {'Logout'}
                btnColor = {'#49a38b'}
              />
            </TouchableOpacity>
          </View>
        )}
        {RenderIf(this.state.screenContent === 'login',
          <View style={styles.LoginScreen}>
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
              title='OK'>
              <ButtonContent
                btnContent = {'OK'}
                btnColor = {'#49a38b'}
              />
            </TouchableOpacity>
          </View>
        )}
        {RenderIf(this.state.screenContent === 'loading',
          <View style={styles.HomeScreen}>
          </View>
        )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  HomeScreen: {
    flex: 1,
    backgroundColor: '#331c48',
    alignItems: 'center',
    justifyContent: 'center',
  },
  LoginScreen: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  LoginInput: {
    height: 50,
    fontSize: 20,
  },
});
