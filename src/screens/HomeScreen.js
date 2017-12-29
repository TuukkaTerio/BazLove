import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Font } from 'expo';
import ButtonContent from '../components/ButtonContent';
import RenderIf from '../components/helpers/RenderIf';
import { Colors } from '../components/helpers/Colors';
import Logo from '../components/svg/Logo';
import SvgCircles from '../components/svg/SvgCircles';
import BackgroundGradient from '../components/svg/BackgroundGradient';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      screenContent: '',
      navigation: this.props.navigation,
      loading: false,
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ screenContent: 'home' });
      } else {
        this.setState({ screenContent: 'login' });
      }
    });
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
      'league-gothic': require('../assets/fonts/LeagueGothic-Regular.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  };

  // Gets an array of gifs and navigates to MessageScreen
  getGif() {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      const that = this;
      const tagArray = ['happy', 'love', 'party'];
      let tag = tagArray[Math.floor(Math.random() * tagArray.length)];
      const apiUrl = 'http://api.giphy.com/v1/stickers/search?api_key=PZf7lIja3FGSHRiQZlhFBCbT3JGWeK1K&q=' + tag + '&limit=25';
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
      Alert.alert("Could not log out");
    });
  }

  // Handles the log out request
  handleLogout() {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      const EmojiBye = String.fromCodePoint(0x1F44B);
      const EmojiNo = String.fromCodePoint(0x274C);
      const EmojiYes = String.fromCodePoint(0x2705);
      Alert.alert(
        'Log out?  ' + EmojiBye,
        '',
        [
          {text: 'Yes  ' + EmojiYes, onPress: () => {this.firebaseLogout(); this.setState({ loading: false });}},
          {text: 'No  ' + EmojiNo, onPress: () => {this.setState({ loading: false });}},
        ],
        { cancelable: false }
      )
    }
  }

  render() {
    return (
      <SafeAreaView style={styles.HomeScreen}>
        <BackgroundGradient gradientColor={Colors['primary']}/>
        {RenderIf(this.state.screenContent === 'home',
          <View>
            <SvgCircles circleSize={300} circleColor={Colors['tertiary']} outputRange={['0deg', '360deg']} circleTop={0} circleRight={215}/>
            <SvgCircles circleSize={260} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={50} circleRight={220}/>
            <SvgCircles circleSize={160} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={300} circleRight={250}/>
            <Logo/>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {
                  if(this.state.loading) {
                    return;
                  } else {
                    this.setState({ loading: true });
                    this.state.navigation.navigate('ReadMessages');
                  }
                }}
                title='READ'>
                <ButtonContent
                  btnContent = {'READ'}
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
                  btnTextColor = {Colors['secondary']}
                />
              </TouchableOpacity>
            </View>
            <Text style={[styles.infoText, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}>Messages are deleted on Mondays at 11 a.m. (UTC +1)</Text>
            <TouchableOpacity
              style={styles.Logout}
              onPress={() => {this.handleLogout()}}
              title='LOG OUT'>
              <Text style={[styles.LogoutText, {fontFamily: this.state.fontLoaded ? 'league-gothic' : null}]}>LOG OUT</Text>
            </TouchableOpacity>
          </View>
        )}
        {RenderIf(this.state.screenContent === 'login',
          <View style={styles.LoginContainer}>
            <TextInput
              style={[styles.LoginInput, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}
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
              style={[styles.LoginInput, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}
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
              title='LOG IN'>
              <ButtonContent
                btnContent = {'LOG IN'}
                btnColor = {'transparent'}
                btnTextColor = {Colors['white']}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  HomeScreen: {
    alignItems: 'center',
    backgroundColor: Colors['primary'],
    flex: 1,
    justifyContent: 'center',
  },
  LoginContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 25,
  },
  LoginInput: {
    backgroundColor: Colors['white'],
    fontSize: 16,
    height: 65,
    lineHeight: 1.5,
    marginTop: 15,
    padding: 20,
    paddingTop: 20,
    width: 280,
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    width: 215,
  },
  infoText: {
    backgroundColor: 'transparent',
    color: Colors['secondary'],
    fontSize: 13,
    marginBottom: 20,
    marginTop: 30,
    textAlign: 'center',
    width: 200,
  },
  Logout: {
    backgroundColor: 'transparent',
    marginBottom: 30,
  },
  LogoutText: {
    color: Colors['secondary'],
    fontSize: 14,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
