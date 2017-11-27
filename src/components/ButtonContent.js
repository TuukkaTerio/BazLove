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
      width: 200,
      textAlign: 'center',
      fontFamily: 'HelveticaNeue-CondensedBlack',
      fontSize: 20,
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
