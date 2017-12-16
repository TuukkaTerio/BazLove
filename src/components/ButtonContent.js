import React, { Component } from 'react';
import { Text } from 'react-native';

export default class ButtonContent extends Component {
  render(props) {
    const btnContent = this.props.btnContent;
    const btnColor = this.props.btnColor;
    const btnTextColor = this.props.btnTextColor;
    const btnStyle = {
      backgroundColor: btnColor,
      padding: 20,
      color: btnTextColor,
      marginTop: 15,
      minWidth: 100,
      textAlign: 'center',
      fontFamily: 'HelveticaNeue-CondensedBold',
      fontSize: 16,
      borderWidth: 1.5,
      borderColor: '#fff',
    }
    return (
      <Text style={btnStyle}>{btnContent}</Text>
    );
  }
}
