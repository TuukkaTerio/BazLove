import React, { Component } from 'react';
import { Text } from 'react-native';
import { Font } from 'expo';
import { Colors } from './helpers/Colors';

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
      borderWidth: 1.5,
      borderColor: Colors['white'],
      color: btnTextColor,
      fontFamily: this.state.fontLoaded ? 'league-gothic' : null,
      fontSize: 19,
      marginTop: 15,
      minWidth: btnWidth,
      padding: 20,
      textAlign: 'center',
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
