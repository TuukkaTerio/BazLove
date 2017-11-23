import React, { Component } from 'react';
import { Alert, AppRegistry, StyleSheet, View, TouchableOpacity, Text } from 'react-native';

export default class CustomButton extends Component {

  _onPressOpenInput() {
    Alert.alert('Öppna Input Rutan!')
  }
  _onPressSendLove() {
    Alert.alert('Skicka kärlek till Firebase!')
  }
  _onPressClose() {
    Alert.alert('Stäng appen!')
  }
  _onPressShowLove() {
    Alert.alert('Visa kärlek <3')
  }

  render() {
    const btnContent = this.props.btnContent;
    let CustomButton = null;

    if (btnContent === 'Send love' || btnContent === 'Send more') {
      // Displays the message input field
      CustomButton =
        <TouchableOpacity
          onPress={this._onPressOpenInput}
          underlayColor="white">
            <Text style={[styles.button, styles.green]}>{btnContent}</Text>
        </TouchableOpacity>;
    } else if (btnContent === 'Send') {
      // Sends the message to the database
      CustomButton =
        <TouchableOpacity
          onPress={this._onPressSendLove}
          underlayColor="white">
            <Text style={[styles.button, styles.purple]}>{btnContent}</Text>
        </TouchableOpacity>;
    } else if (btnContent === 'Close') {
      // Sends the user back to the start view
      CustomButton =
        <TouchableOpacity
          onPress={this._onPressClose}
          underlayColor="white">
            <Text style={[styles.button, styles.purple]}>{btnContent}</Text>
        </TouchableOpacity>;
    } else if (btnContent === 'Show love') {
      // Displays all the messages from the database
      CustomButton =
        <TouchableOpacity
          onPress={this._onPressShowLove}
          underlayColor="white">
            <Text style={[styles.button, styles.purple]}>{btnContent}</Text>
        </TouchableOpacity>;
    }
    return (
      <View>
        {CustomButton}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    padding: 20,
    color: 'white',
    marginTop: 15,
    width: 150,
    textAlign: 'center',
  },
  green: {
    backgroundColor: '#49a38b',
  },
  purple: {
    backgroundColor: '#331c48',
  },
})
