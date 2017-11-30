import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { View, FlatList, StyleSheet, Text } from 'react-native';

export default class ShowLoveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ loading: true });
    const keyParent = firebase.database().ref('messages');
    keyParent.on(('child_added'), snapshot => {
      const newChild = {
        key: snapshot.key,
        timestamp: snapshot.val().timestamp,
        message: snapshot.val().message,
      };
      this.setState((prevState) => ({ messageList: [...prevState.messageList, newChild] }));
    });
    this.setState({ loading: false });
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen}>
        <FlatList
          data={this.state.messageList}
          renderItem={({item}) => <Text>{item.message}</Text>}
        />
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
