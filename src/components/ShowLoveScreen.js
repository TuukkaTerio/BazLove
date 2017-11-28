import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { View, ListView, StyleSheet, Text } from 'react-native';

export default class ShowLoveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.itemsRef = Database.ref('messages');
    this.state = {
      messageSource: new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2})
    };
    this.items = [];
  }

  componentDidMount() {
    // When a message is added
    this.itemsRef.on('child_added', (dataSnapshot) => {
      this.items.push({id: dataSnapshot.key, text: dataSnapshot.val()});
      this.setState({
        messageSource: this.state.messageSource.cloneWithRows(this.items)
      });
    });

    // When a message is removed
    this.itemsRef.on('child_removed', (dataSnapshot) => {
        this.items = this.items.filter((x) => x.id !== dataSnapshot.key);
        this.setState({
          messageSource: this.state.messageSource.cloneWithRows(this.items)
        });
    });
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen}>
        <ListView
          dataSource={this.state.messageSource}
          renderRow={(rowData) => <Text>{rowData.toString()}</Text>}
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
