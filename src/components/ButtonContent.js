import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ButtonContent extends Component {
  render(props) {
    const btnContent = this.props.btnContent;
    const btnStyle = {
      backgroundColor: this.props.btnColor,
      padding: 20,
      color: '#fff',
      marginTop: 15,
      width: 100,
      textAlign: 'center',
      fontFamily: 'HelveticaNeue-CondensedBold',
      fontSize: 16,
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
