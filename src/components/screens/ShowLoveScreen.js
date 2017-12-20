import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../../firebaseConfig';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonContent from '../ButtonContent';
import BackgroundGradient from '../BackgroundGradient';
import { Colors } from '../Colors';
import RenderIf from '../RenderIf';
import Loader from '../Loader';

export default class ShowLoveScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: '',
      navigation: this.props.navigation,
      loading: false,
      loadingMessages: true,
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
    });
    this.setState({ loadingMessages: false });
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen} ref="flatListView">
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === true),
          <Loader textContent={'LOADING'}/>
        )}
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <Loader textContent={'NO MESSAGES'}/>
        )}
        <BackgroundGradient/>
        <FlatList
          style={styles.LoveList}
          data={this.state.messageList}
          renderItem={({item}) =>
            <View style={styles.LoveListItem}>
              <Text style={styles.LoveListItemText}>{item.message}</Text>
            </View>
          }
        />
        <TouchableOpacity
          onPress={() => {
            if(this.state.loading) {
              return;
            } else {
              this.setState({ loading: true });
              this.state.navigation.navigate('Home');
            }
          }}
          title='CLOSE'>
          <ButtonContent
            btnContent = {'CLOSE'}
            btnColor = {Colors['white']}
            btnTextColor = {Colors['pinkLight']}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  ShowLoveScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors['yellow'],
    paddingBottom: 30,
  },
  LoveList: {
    width: 280,
    marginTop: 40,
    height: 420,
    maxHeight: 420,
  },
  LoveListItem: {
    marginBottom: 10,
    padding: 20,
    backgroundColor: Colors['white'],
    width: 280,
    borderRadius: 5,
  },
  LoveListItemText: {
    fontSize: 16,
  },
});
