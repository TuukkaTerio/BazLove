import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import RenderIf from './RenderIf';
import ButtonContent from './ButtonContent';
import Logo from './Logo';

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
            <Logo/>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => this.state.navigation.navigate('Message')}
                title='SEND'>
                <ButtonContent
                  btnContent = {'SEND'}
                  btnColor = {'#49a38b'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => this.state.navigation.navigate('ShowLove')}
                title='SHOW'>
                <ButtonContent
                  btnContent = {'SHOW'}
                  btnColor = {'#331c48'}
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.infoText}>Messages are deleted on Mondays at 11 a.m. (UTC +1)</Text>
            <TouchableOpacity
              style={styles.Logout}
              onPress={() => {this.handleLogout()}}
              title='Logout'>
              <Text>Logout</Text>
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
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'flex-start',
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
  ButtonContainer: {
    marginTop: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 215,
  },
  Buttons: {

  },
  infoText: {
    width: 200,
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
  },
  Logout: {
    marginBottom: 40,
    paddingBottom: 3,
    borderStyle: 'solid',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
});
