import React, { Component } from 'react';
import { StyleSheet, Text, Button, View, AppRegistry, Image } from 'react-native';

export default class App extends React.Component {
  render() {
    let pic = {
      uri: 'https://pbs.twimg.com/profile_images/790944603373461504/VGq52TJ6_400x400.jpg'
    };
    return (
      <View style={styles.container}>
        <Text>Baz</Text>
        <Text>Love</Text>
        <Image source={pic} style={{width: 193, height: 110}}/>
        <Button
          onPress={() => this._handlePress()}
          title="Send"
        >
          Send
        </Button>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffd92a',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
