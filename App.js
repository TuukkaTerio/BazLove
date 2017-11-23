import React, { Component } from 'react';
import { StyleSheet, View, AppRegistry } from 'react-native';
import Logo from './src/components/Logo';
import CustomButton from './src/components/CustomButton';
import MessageInput from './src/components/MessageInput';
import Confirmation from './src/components/Confirmation';
import ShowLove from './src/components/ShowLove';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      // Controls which page view is displayed
      view : '',
    };
  }
  render() {

    const view = this.state.view;
    let pageContent = null;

    if (view === 'messageView') {
      pageContent =
        <View>
          <MessageInput/>
          <CustomButton btnContent='Send'/>
          <CustomButton btnContent='Close'/>
        </View>;
    } else if (view === 'confirmationView') {
      pageContent =
        <View>
          <Confirmation/>
          <CustomButton btnContent='Send more'/>
          <CustomButton btnContent='Close'/>
        </View>;
    } else if (view === 'showLoveView') {
      pageContent =
        <View>
          <ShowLove/>
          <CustomButton btnContent='Close'/>
        </View>;
    } else {
      pageContent =
        <View>
          <Logo/>
          <CustomButton btnContent='Send love'/>
          <CustomButton btnContent='Show love'/>
        </View>;
    }
    return (
      <View style={styles.mainContainer}>
        {pageContent}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
