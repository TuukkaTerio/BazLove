import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, Dimensions, Keyboard, Platform, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Font, AppLoading } from 'expo';
import ButtonContent from '../components/ButtonContent';
import RenderIf from '../components/helpers/RenderIf';
import { Colors } from '../components/helpers/Colors';
import Logo from '../components/svg/Logo';
import SvgCircles from '../components/svg/SvgCircles';
import BcImgHome from '../components/svg/android/BcImgHome';
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

  componentDidMount() {
    // Locks the orientation to portrait
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    // Checks if the user is logged in
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ screenContent: 'home' });
      } else {
        this.setState({ screenContent: 'login' });
      }
    });
    Keyboard.dismiss();
  }

  // Loads the custom fonts
  async cacheResourcesAsync() {
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
      'league-gothic': require('../assets/fonts/LeagueGothic-Regular.otf'),
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
      Alert.alert("Could not log out");
    });
  }

  // Handles the log out request
  handleLogout() {
    if(this.state.loading) {
      return;
    } else {
      this.setState({ loading: true });
      const EmojiBye = '\uD83D\uDC4B';
      const EmojiNo = '\u274C';
      const EmojiYes = '\u2705';
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
    if (!this.state.fontLoaded) {
      return (
        <AppLoading
          startAsync={this.cacheResourcesAsync}
          onFinish={() => this.setState({ fontLoaded: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <SafeAreaView style={styles.BaseStyle}>
        <BackgroundGradient gradientColor={Colors['primary']}/>
        {RenderIf(this.state.screenContent === 'home',
          <View style={styles.HomeScreen}>
            {RenderIf(Platform.OS === 'ios',
              <View style={styles.CirclesContainer}>
                <SvgCircles circleSize={(windowWidth*1.1)} circleColor={Colors['tertiary']} outputRange={['0deg', '360deg']} circleTop={-(windowWidth*0.1)} circleRight={(windowWidth*0.99)}/>
                <SvgCircles circleSize={(windowWidth*0.9)} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={(windowWidth*0.1)} circleRight={windowWidth}/>
                <SvgCircles circleSize={(windowWidth*0.6)} circleColor={Colors['secondary']} outputRange={['360deg', '0deg']} circleTop={(windowWidth*0.82)} circleRight={windowWidth}/>
              </View>
            )}
            {RenderIf(Platform.OS === 'android',
              <BcImgHome/>
            )}
            <View style={styles.MainContentContainer}>
              <Logo size={windowWidth}/>
              <View style={styles.ButtonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    if(this.state.loading) {
                      return;
                    } else {
                      this.setState({ loading: true });
                      this.state.navigation.navigate('ReadMessages', { gifArray: [], gifArray2: [] });
                    }
                  }}
                  title='READ'>
                  <ButtonContent
                    btnContent = {'READ'}
                    btnColor = {'transparent'}
                    btnTextColor = {Colors['white']}
                    btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if(this.state.loading) {
                      return;
                    } else {
                      this.setState({ loading: true });
                      this.state.navigation.navigate('Message', { gifArray: [] });
                    }
                  }}
                  title='SEND'>
                  <ButtonContent
                    btnContent = {'SEND'}
                    btnColor = {Colors['white']}
                    btnTextColor = {Colors['secondary']}
                    btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
                  />
                </TouchableOpacity>
              </View>
              <Text style={[styles.infoText, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}>Messages are deleted on Mondays at 11 a.m. (UTC +1)</Text>
            </View>
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
              maxLength = {300}
              autoCapitalize = {'none'}
              autoCorrect = {false}
              underlineColorAndroid = 'rgba(0,0,0,0)'
            />
            <TextInput
              style={[styles.LoginInput, {fontFamily: this.state.fontLoaded ? 'open-sans' : null}]}
              ref={input => { this.passwordInput = input }}
              placeholder="Password"
              onChangeText={(userPassword) => this.setState({userPassword})}
              maxLength = {300}
              autoCapitalize = {'none'}
              autoCorrect = {false}
              secureTextEntry = {true}
              underlineColorAndroid = 'rgba(0,0,0,0)'
            />
            <TouchableOpacity
              onPress={() => {this.handleLogin(this.state.userEmail, this.state.userPassword)}}
              title='LOG IN'>
              <ButtonContent
                btnContent = {'LOG IN'}
                btnColor = {'transparent'}
                btnTextColor = {Colors['white']}
                btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
              />
            </TouchableOpacity>
          </View>
        )}
      </SafeAreaView>
    )
  }
}

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  BaseStyle: {
    alignItems: 'center',
    backgroundColor: Colors['primary'],
    flex: 1,
    justifyContent: 'flex-start',
    ...Platform.select({
      android: {
        paddingTop: windowHeight * 0.05,
      },
    }),
  },
  HomeScreen: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
  },
  CirclesContainer: {
    left: 0,
    top: (windowWidth*0.05),
    zIndex: (-1),
    width: (windowWidth),
  },
  MainContentContainer: {
    alignItems: 'center',
  },
  LoginContainer: {
    alignItems: 'center',
    flex: 1,
    marginTop: 15,
  },
  LoginInput: {
    backgroundColor: Colors['white'],
    fontSize: 16,
    height: 65,
    lineHeight: 1.5,
    marginTop: 15,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
    width: (windowWidth-30),
  },
  ButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: 215,
  },
  infoText: {
    backgroundColor: 'transparent',
    color: Colors['secondary'],
    fontSize: 14,
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
    fontSize: 16,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});
