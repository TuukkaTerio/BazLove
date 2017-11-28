import React, { Component } from 'react';
import Database from '../firebaseConfig';
import { View, StyleSheet, Text } from 'react-native';

export default class ShowLoveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = Database.ref('messages');
    this.state = {
      messageSource: '',
    };
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen}>
        <Text>Show Love Here</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ShowLoveScreen: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
