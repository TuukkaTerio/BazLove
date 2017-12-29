import React, { PureComponent } from 'react';
import { Text } from 'react-native';

export default class ButtonContent extends React.PureComponent {
  render(props) {
    const btnStyle = {
      backgroundColor: this.props.btnColor,
      borderWidth: 1.5,
      borderColor: '#fff',
      color: this.props.btnTextColor,
      fontFamily: this.props.btnFont,
      fontSize: 19,
      marginTop: 15,
      minWidth: (this.props.btnCustomWidth ? this.props.btnCustomWidth : 100),
      padding: 20,
      textAlign: 'center',
    }
    return (
      <Text style={btnStyle}>{this.props.btnContent}</Text>
    );
  }
}
