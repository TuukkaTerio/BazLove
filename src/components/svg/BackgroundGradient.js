import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import { LinearGradient } from 'expo';

export default class BackgroundGradient extends React.PureComponent {
  render(props) {
    const gradientContainerStyle = {
      bottom: 0,
      position: 'absolute',
      zIndex: -1
    };
    const gradientStyle = {
      height: Dimensions.get('window').height * 0.3,
      width: Dimensions.get('window').width
    };
    return (
      <View style={gradientContainerStyle} >
        <LinearGradient
          colors={[this.props.gradientColor, '#fff']}
          style={gradientStyle}
        />
      </View>
    );
  }
}
