import React, { Component } from 'react';
import * as firebase from 'firebase';
import Database from '../../firebaseConfig';
import { View, FlatList, StyleSheet, Text, TouchableOpacity } from 'react-native';
import ButtonContent from '../ButtonContent';
import BackgroundGradient from '../BackgroundGradient';
import SvgCircles from '../SvgCircles';

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
    });
  };

  componentDidMount() {
    this.makeRemoteRequest();
  }

  render() {
    return (
      <View style={styles.ShowLoveScreen} ref="flatListView">
        <BackgroundGradient/>
        <SvgCircles circleSize={500} circleColor={'#D04CC0'} outputRange={['0deg', '360deg']} circleTop={-50} circleRight={300}/>
        <SvgCircles circleSize={300} circleColor={'#FF62CA'} outputRange={['360deg', '0deg']} circleTop={300} circleRight={350}/>
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
          onPress={() => {this.state.navigation.navigate('Home')}}
          title='CLOSE'>
          <ButtonContent
            btnContent = {'CLOSE'}
            btnColor = {'#fff'}
            btnTextColor = {'#FF62CA'}
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
    justifyContent: 'flex-start',
    backgroundColor: '#ffd92a',
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
    backgroundColor: '#fff',
    width: 280,
    borderRadius: 10,
  },
  LoveListItemText: {
    fontSize: 16,
  },
});
