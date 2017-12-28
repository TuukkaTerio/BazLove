import React, { Component } from 'react';
import { Text } from 'react-native';
import { Colors } from './Colors';
import { Font } from 'expo';

export default class ButtonContent extends Component {

  componentDidMount() {
    Font.loadAsync({
      'league-gothic': require('../fonts/LeagueGothic-Regular.otf'),
    });
  }

  render(props) {
    const btnContent = this.props.btnContent;
    const btnColor = this.props.btnColor;
    const btnTextColor = this.props.btnTextColor;
    const btnWidth = this.props.btnCustomWidth ? this.props.btnCustomWidth : 100;
    const btnStyle = {
      backgroundColor: btnColor,
      padding: 20,
      color: btnTextColor,
      marginTop: 15,
      minWidth: btnWidth,
      textAlign: 'center',
      fontFamily: 'league-gothic',
      fontSize: 19,
      borderWidth: 1.5,
      borderColor: Colors['white'],
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
