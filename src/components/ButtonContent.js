import React, { Component } from 'react';
import { Text } from 'react-native';
import { Colors } from './helpers/Colors';
import { Font } from 'expo';

export default class ButtonContent extends Component {

  constructor(props) {
    super(props);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'league-gothic': require('../assets/fonts/LeagueGothic-Regular.otf'),
    });
    this.setState({ fontLoaded: true });
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
      fontSize: 19,
      borderWidth: 1.5,
      borderColor: Colors['white'],
      fontFamily: this.state.fontLoaded ? 'league-gothic' : null,
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
