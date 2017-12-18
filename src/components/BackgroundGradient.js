import React, { Component } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Colors } from './Colors';
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

export default class BackgroundGradient extends React.Component {
  render() {
    let ScreenHeight = Dimensions.get("window").height;
    let ScreenWidth = Dimensions.get("window").width;
    return (
      <Svg height={ScreenHeight} width={ScreenWidth} position="absolute" zIndex="-1">
        <Defs>
          <LinearGradient id="bcGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <Stop offset="70%" stopColor={Colors['yellow']} stopOpacity="1" />
              <Stop offset="100%" stopColor={Colors['white']} stopOpacity="1" />
          </LinearGradient>
        </Defs>
        <Rect
          x="0"
          y="0"
          width="100%"
          height="200%"
          fill="url(#bcGradient)"
        />
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  BackgroundGradient: {
    height: 500,
    width: 500,
  },
});
