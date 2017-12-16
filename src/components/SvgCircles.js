import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
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
  render() {
    return (
      <Svg style={styles.SvgCircles}>
        <Circle
          cx="150"
          cy="145"
          r="100"
          fill="#331c48"
          // animation: from0to360 1s linear infinite;
          // transform-origin: 145px 150px;
        />
        <Circle
          cx="150"
          cy="155"
          r="100"
          fill="#25CF12"
          // animation: from0to360 2s linear infinite;
          // transform-origin: 155px 150px;
        />
        <Circle
          cx="145"
          cy="150"
          r="100"
          fill="#ccc"
          // animation: from0to360 3s linear infinite;
          // transform-origin: 150px 145px;
        />
        <Circle
          cx="155"
          cy="150"
          r="100"
          fill="#FF5CC9"
          // animation: from0to360 2.5s linear infinite;
          // transform-origin: 150px 155px;
        />
      </Svg>
    );
  }
}

const styles = StyleSheet.create({
  SvgCircles: {
    height: 300,
    width: 300,
    zIndex: -11,
    position: 'absolute',
  },
});
