import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MessageListItem from '../components/MessageListItem';
import ButtonContent from '../components/ButtonContent';
import { Colors } from '../components/helpers/Colors';
import RenderIf from '../components/helpers/RenderIf';
import BackgroundGradient from '../components/svg/BackgroundGradient';
import SvgHeart from '../components/svg/SvgHeart';

export default class ReadMessagesScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      messageList: '',
      navigation: this.props.navigation,
      loading: false,
      loadingMessages: true,
    };
  }

  componentDidMount() {
    this.makeRemoteRequest();
  }

  // Gets the messages from Firebase, checks if there is a new child
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
        this.setState((prevState) => ({ messageList: [newChild, ...prevState.messageList] }));
      }
    });
    this.setState({ loadingMessages: false });
  };

  // Renders a single message
  renderListItem = ({item}) => (
    <MessageListItem message={item.message}/>
  );

  render() {
    return (
      <SafeAreaView style={styles.ReadMessagesScreen} ref="flatListView">
        <BackgroundGradient gradientColor={Colors['secondary']}/>
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <SvgHeart textContent={'WAITING FOR MESSAGES'}/>
        )}
        <FlatList
          data={this.state.messageList}
          style={styles.LoveList}
          renderItem={this.renderListItem}
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
          style={styles.Button}
          title='CLOSE'>
          <ButtonContent
            btnContent = {'CLOSE'}
            btnColor = {'transparent'}
            btnTextColor = {Colors['white']}
          />
        </TouchableOpacity>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  ReadMessagesScreen: {
    alignItems: 'center',
    backgroundColor: Colors['secondary'],
    flex: 1,
    justifyContent: 'flex-end',
  },
  LoveList: {
    marginTop: 30,
    width: Dimensions.get("window").width,
  },
  Button: {
    marginBottom: 30,
  },
});
