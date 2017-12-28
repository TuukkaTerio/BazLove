import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { SafeAreaView, View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonContent from '../components/ButtonContent';
import BackgroundGradient from '../components/svg/BackgroundGradient';
import { Colors } from '../components/helpers/Colors';
import RenderIf from '../components/helpers/RenderIf';
import SvgHeart from '../components/svg/SvgHeart';
import { Font } from 'expo';

export default class ReadMessagesScreen extends React.Component {

  static navigationOptions = {
    headerStyle: {
      display: 'none',
    }
  };

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

  async componentDidMount() {
    Expo.ScreenOrientation.allow(Expo.ScreenOrientation.Orientation.PORTRAIT_UP );
    this.makeRemoteRequest();
    await Font.loadAsync({
      'open-sans': require('../assets/fonts/OpenSans-Regular.ttf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    return (
      <SafeAreaView style={styles.ReadMessagesScreen} ref="flatListView">
        <BackgroundGradient gradientColor={Colors['secondary']}/>
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === true) || !this.state.fontLoaded,
          <SvgHeart textContent={'LOADING'}/>
        )}
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <SvgHeart textContent={'NO MESSAGES'}/>
        )}
        {RenderIf((this.state.fontLoaded === true),
          <FlatList
            style={styles.LoveList}
            data={this.state.messageList}
            renderItem={({item}) =>
              <View style={styles.LoveListItem}>
                <Text style={[styles.LoveListItemText, {fontFamily: 'open-sans'}]}>
                  {item.message}
                </Text>
              </View>
            }
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
  },
  Button: {
    marginBottom: 40,
  },
});
