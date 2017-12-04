import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonContent from './ButtonContent';

export default class ShowLoveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: '',
      navigation: this.props.navigation,
    };
  }

  makeRemoteRequest = () => {
    const keyParent = firebase.database().ref('messages');
    keyParent.on(('child_added'), snapshot => {
      const newChild = {
        key: snapshot.key,
        timestamp: snapshot.val().timestamp,
        message: snapshot.val().message,
      };
      // Checks if the component is mounted before updating it.
      if (this.refs.flatListView) {
        this.setState((prevState) => ({ messageList: [...prevState.messageList, newChild] }));
      }
      // Removes all messages every monday at 11am.
      const date = new Date();
      const day = date.getDay();
      const time = date.getHours();
      if (day === 1 && time === 11) {
        keyParent.remove()
      }
    });
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen} ref="flatListView">
        <FlatList
          data={this.state.messageList}
          renderItem={({item}) => <Text>{item.message}</Text>}
        />
        <TouchableOpacity
          onPress={() => {this.state.navigation.navigate('Home')}}
          title='Close'>
          <ButtonContent
            btnContent = {'Close'}
            btnColor = {'#331c48'}
          />
        </TouchableOpacity>
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
