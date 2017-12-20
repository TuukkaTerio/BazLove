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

  constructor(props) {
    super(props)
    this.spinValue = new Animated.Value(0)
  }

  componentDidMount() {
    this.spin()
  }

  spin() {
    this.spinValue.setValue(0)
    Animated.timing(
      this.spinValue,
      {
        toValue: 1,
        duration: 4000,
        easing: Easing.linear
      }
    ).start(() => this.spin())
  }

  render(props) {
    const clockwise = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: this.props.outputRange
    });
    const counterclockwise = this.spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: this.props.outputRange
    });
    const circleSize = this.props.circleSize;
    const circleColor = this.props.circleColor;
    const circleStyle = {
      height: circleSize,
      width: circleSize,
    }
    const circlesContainer = {
      position: 'absolute',
      zIndex: -1,
      top: this.props.circleTop,
      right: this.props.circleRight,
    }
    const rotatingContainer = {
      transform: [{rotate: clockwise}],
      position: 'absolute',
    }
    return (
      <View style={circlesContainer}>
        <Animated.View style={rotatingContainer}>
          <Svg viewBox={'0 0 300 300'} style={circleStyle}>
            <Circle
              cx="145"
              cy="145"
              r="100"
              fill={circleColor}
            />
          </Svg>
        </Animated.View>
        <Animated.View style={rotatingContainer}>
          <Svg viewBox={'0 0 300 300'} style={circleStyle}>
            <Circle
              cx="150"
              cy="155"
              r="100"
              fill={circleColor}
            />
          </Svg>
        </Animated.View>
        <Animated.View style={rotatingContainer}>
          <Svg viewBox={'0 0 300 300'} style={circleStyle}>
            <Circle
              cx="145"
              cy="150"
              r="100"
              fill={circleColor}
            />
          </Svg>
        </Animated.View>
        <Animated.View style={rotatingContainer}>
          <Svg viewBox={'0 0 300 300'} style={circleStyle}>
            <Circle
              cx="155"
              cy="150"
              r="100"
              fill={circleColor}
            />
          </Svg>
        </Animated.View>
      </View>
    );
  }
}
