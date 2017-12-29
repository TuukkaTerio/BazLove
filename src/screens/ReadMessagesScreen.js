import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Font } from 'expo';
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
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    this.makeRemoteRequest();
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  };

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

  renderListItem = ({item}) => (
    <MessageListItem message={item.message} font={'open-sans'}/>
  );

  render() {
    return (
      <SafeAreaView style={styles.ReadMessagesScreen} ref="flatListView">
        <BackgroundGradient gradientColor={Colors['secondary']}/>
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <SvgHeart textContent={'WAITING FOR MESSAGES'} font={this.state.fontLoaded ? 'league-gothic' : null}/>
        )}
        {RenderIf((this.state.fontLoaded === true),
          <FlatList
            data={this.state.messageList}
            style={styles.LoveList}
            renderItem={this.renderListItem}
          />
        )}
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
            btnFont = {this.state.fontLoaded ? 'league-gothic' : null}
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
