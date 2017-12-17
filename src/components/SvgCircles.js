import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Animated,
  Image,
  Easing
} from 'react-native';
import Svg, { Circle,
    Ellipse,
    G,
    LinearGradient,
    RadialGradient,
    Line,
    Path,
    Polygon,
    Polyline,
    Rect,
    Symbol,
    Text,
    Use,
    Defs,
    Stop } from 'react-native-svg';

export default class SvgCircles extends React.Component {

  constructor () {
    super()
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount () {
    this.spin()
  }
  spin () {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 3000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render(props) {
    const spin = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '360deg']
    });
    const circleSize = this.props.circleSize;
    const circleColor = this.props.circleColor;
    const circleStyle = {
      height: circleSize,
      width: circleSize,
    }
    const circlesContainer = {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      zIndex: -1,
    }
    const rotatingContainer = {
      transform: [{rotate: spin}],
    }
    return (
      <View style={circlesContainer}>
        <Animated.View style={rotatingContainer}>
          <Svg viewBox={'0 0 300 300'} style={circleStyle}>
            <Circle
              cx="150"
              cy="145"
              r="100"
              fill={circleColor}
              // transform-origin: 145px 150px;
            />
          </Svg>
        </Animated.View>
        <Animated.View style={circleStyle}>
          <Svg viewBox={'0 0 300 300'}>
            <Circle
              cx="150"
              cy="155"
              r="100"
              fill={circleColor}
              // transform-origin: 145px 150px;
            />
          </Svg>
        </Animated.View>
        <Animated.View style={circleStyle}>
          <Svg viewBox={'0 0 300 300'}>
            <Circle
              cx="145"
              cy="150"
              r="100"
              fill={circleColor}
              // transform-origin: 145px 150px;
            />
          </Svg>
        </Animated.View>
        <Animated.View style={circleStyle}>
          <Svg viewBox={'0 0 300 300'}>
            <Circle
              cx="155"
              cy="150"
              r="100"
              fill={circleColor}
              // transform-origin: 145px 150px;
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }
}
