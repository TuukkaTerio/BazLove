import React, { PureComponent } from 'react';
import { Dimensions, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

export default class BackgroundGradient extends React.PureComponent {
  render(props) {
    const gradientContainer = {
      position: 'absolute',
      zIndex: (-1),
      top: 0,
      left: 0,
      height: Dimensions.get('window').height,
      width: Dimensions.get('window').width
    };
    return (
      <View style={gradientContainer}>
        <Svg height={'100%'} width={'100%'}>
          <Defs>
            <LinearGradient id='bcGradient' x1='0%' y1='0%' x2='0%' y2='100%'>
              <Stop offset='70%' stopColor={this.props.gradientColor} stopOpacity='1' />
              <Stop offset='100%' stopColor='#fff' stopOpacity='1' />
            </LinearGradient>
          </Defs>
          <Rect
            x='0'
            y='0'
            width='100%'
            height='200%'
            fill='url(#bcGradient)'
          />
        </Svg>
      </View>
    );
  }
}
