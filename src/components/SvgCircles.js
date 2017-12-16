import React, { Component } from 'react';
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
  render(props) {
    const circleSize = this.props.circleSize;
    const circleColor = this.props.circleColor;
    const circleStyle = {
      height: circleSize,
      width: circleSize,
      zIndex: -11,
      position: 'absolute',
    }
    return (
      <Svg viewBox={'0 0 300 300'} style={circleStyle}>
        <Circle
          cx="150"
          cy="145"
          r="100"
          fill={circleColor}
          // animation: from0to360 1s linear infinite;
          // transform-origin: 145px 150px;
        />
        <Circle
          cx="150"
          cy="155"
          r="100"
          fill={circleColor}
          // animation: from0to360 2s linear infinite;
          // transform-origin: 155px 150px;
        />
        <Circle
          cx="145"
          cy="150"
          r="100"
          fill={circleColor}
          // animation: from0to360 3s linear infinite;
          // transform-origin: 150px 145px;
        />
        <Circle
          cx="155"
          cy="150"
          r="100"
          fill={circleColor}
          // animation: from0to360 2.5s linear infinite;
          // transform-origin: 150px 155px;
        />
      </Svg>
    );
  }
}
