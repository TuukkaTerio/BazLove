import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../firebaseConfig';
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Font } from 'expo';
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
        this.setState((prevState) => ({ messageList: [...prevState.messageList, newChild] }));
      }
    });
    this.setState({ loadingMessages: false });
  };

  render() {
    return (
      <SafeAreaView style={styles.ReadMessagesScreen} ref="flatListView">
        <BackgroundGradient gradientColor={Colors['secondary']}/>
        {RenderIf((this.state.messageList === '') && (this.state.loadingMessages === false),
          <SvgHeart textContent={'WAITING FOR MESSAGES'}/>
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
    alignItems: 'center',
    backgroundColor: Colors['secondary'],
    flex: 1,
    justifyContent: 'flex-end',
  },
  LoveList: {
    marginTop: 30,
    width: Dimensions.get("window").width,
  },
  LoveListItem: {
    backgroundColor: Colors['white'],
    borderRadius: 5,
    marginBottom: 10,
    marginLeft: 15,
    marginRight: 15,
    padding: 20,
  },
  LoveListItemText: {
    fontSize: 16,
  },
  Button: {
    marginBottom: 30,
  },
});
