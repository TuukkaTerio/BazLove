import React, { Component } from 'react';
import { Alert, TouchableOpacity, View, TextInput } from 'react-native';
import ButtonContent from './ButtonContent';

const MessageScreen = ({ navigation }) => (
  <View>
    <TextInput
      style={{height: 100, fontSize: 42}}
      placeholder="Spread the love!"
    />
    <TouchableOpacity
      onPress={() => Alert.alert('THANKS!')}
      title='Send message'>
      <ButtonContent
        btnContent = {'Send message'}
        btnColor = {'#49a38b'}
      />
    </TouchableOpacity>
  </View>
);

export default MessageScreen;
