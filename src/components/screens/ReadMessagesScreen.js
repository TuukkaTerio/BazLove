import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../../firebaseConfig';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonContent from '../ButtonContent';
import BackgroundGradient from '../BackgroundGradient';
import { Colors } from '../Colors';
import RenderIf from '../RenderIf';
import SvgHeart from '../SvgHeart';
import { Font } from 'expo';

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
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    this.makeRemoteRequest();
    Font.loadAsync({
      'open-sans': require('../../fonts/OpenSans-Regular.ttf'),
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.ReadMessagesScreen} ref="flatListView">
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === true),
          <SvgHeart textContent={'LOADING'}/>
        )}
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <SvgHeart textContent={'NO MESSAGES'}/>
        )}
        <BackgroundGradient gradientColor={Colors['secondary']}/>
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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: Colors['secondary'],
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
    fontFamily: 'open-sans',
  },
  Button: {
    marginBottom: 40,
  },
});
