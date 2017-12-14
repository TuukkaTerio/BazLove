import React, { Component } from 'react';
import * as firebase from 'firebase';
import { Alert, TouchableOpacity, StyleSheet, View, Text, TextInput } from 'react-native';
import RenderIf from './RenderIf';
import ButtonContent from './ButtonContent';
import Logo from './Logo';
import Svg, { Line, Path } from 'react-native-svg';

export default class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      userPassword: '',
      screenContent: 'loading',
      navigation: this.props.navigation,
      numPoints: 10,
      duration: 900,
      delayPointsArray: [],
      delayPointsMax: 300,
      delayPerPath: 250,
      timeStart: Date.now(),
      isOpened: false,
      isAnimating: false,
      pathLength: 1,
      pathD: 'V 100 H 0',
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

  /**
   *
   * This code is based on shape-overlays by ykob.
   * https://github.com/ykob/shape-overlays
   *
   * The easing cubicInOut is based on the code of glsl-easing module.
   * https://github.com/glslify/glsl-easings
   *
   */

  cubicInOut(t) {
    return t < 0.5
      ? 4.0 * t * t * t
      : 0.5 * Math.pow(2.0 * t - 2.0, 3.0) + 1.0;
  }

  updatePath(time) {
    const points = [];
    let str = '';
    for (i = 0; i < 10; i++) {
      points.push((1 - this.cubicInOut(Math.min(Math.max(time - this.state.delayPointsArray[i], 0) / this.state.duration, 1))) * 100);
    }
    str += (this.state.isOpened) ? 'M 0 0 V ' + points.join(' ') : 'M 0 ' + points.join(' ');
    for (i = 0; i < 9; i++) {
      const p = (i + 1) / (this.state.numPoints - 1) * 100;
      const cp = p - (1 / (this.state.numPoints - 1) * 100) / 2;
      str += 'C ' + cp + ' ' + points.join(' ') + cp + ' ' + points.join(' ') + p + ' ' + points.join(' ');
    }
    str += (this.state.isOpened) ? 'V 100 H 0' : 'V 0 H 0';
    this.setState({ pathD: str });
    console.log('STR är:' + str);
    console.log('pathD är:' + this.state.pathD);
  }

  renderLoop() {
    if (this.state.isOpened) {
      this.updatePath(Date.now() - (this.state.timeStart + this.state.delayPerPath * 1))
    } else {
      this.updatePath(Date.now() - (this.state.timeStart + this.state.delayPerPath * (this.state.pathLength - 1)))
    }
    if (Date.now() - this.state.timeStart < this.state.duration + this.state.delayPerPath * (this.state.pathLength - 1) + this.state.delayPointsMax) {
      requestAnimationFrame(() => {
        this.renderLoop();
      });
    }
    else {
      this.setState({ isAnimating: false});
    }
  }

  toggle() {
    this.setState({ isAnimating: true});
    for (i = 0; i < 10; i++) {
      this.state.delayPointsArray.push(Math.random() * this.state.delayPointsMax);
    }
    if (this.state.isOpened === false) {
      this.setState({ isOpened: true});
      this.setState({ timeStart: Date.now()});
      this.renderLoop();
    } else {
      this.setState({ isOpened: false});
      this.setState({ timeStart: Date.now()});
      this.renderLoop();
    }
  }

  handleShapeOverlays(isAnimating, isOpened) {
    if (isAnimating === true) {
      return false;
    }
    this.toggle();
    if (isOpened === true) {
      this.toggle();
    }
  }

  // Handles the SVG ShapeOverlays & Navigation to next screen
  handleClick(destination) {
    this.handleShapeOverlays();
    this.state.navigation.navigate(destination);
  }

  render() {
    return (
      <View style={styles.HomeScreen}>
        {RenderIf(this.state.screenContent === 'home',
          <View>
            <Logo/>
            <View style={styles.ButtonContainer}>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {this.handleClick('Message')}}
                title='SEND'>
                <ButtonContent
                  btnContent = {'SEND'}
                  btnColor = {'#49a38b'}
                />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.Buttons}
                onPress={() => {this.handleClick('ShowLove')}}
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
              <Text style={styles.LogoutText}>Logout</Text>
            </TouchableOpacity>
            <Svg
              style={styles.ShapeOverlay}
              viewBox={'0 0 100 100'}
            >
              <Path d={this.state.pathD} fill='#000'/>
            </Svg>
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
                  btnColor = {'#49a38b'}
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
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  LoginContainer: {
    marginTop: 25,
    width: 280,
    flex: 1,
    alignItems: 'center',
  },
  LoginInput: {
    backgroundColor: '#fff',
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
  },
  Logout: {
    marginBottom: 40,
  },
  LogoutText: {
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  ShapeOverlay: {
    width: 400,
  	height: 400,
  	position: 'absolute',
  	top: 0,
  	left: 0,
    zIndex: 3,
  },
});
