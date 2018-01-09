import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../helpers/Colors';

export default class BcImgHome extends React.PureComponent {
  render(props) {
    const size = Dimensions.get("window").width * 0.9;
    const topPosition = Dimensions.get("window").height * (-0.05);
    return (
      <Svg
        style={{ height: size * 1.45, position: 'absolute', top: topPosition, width: size, zIndex: -1}}
        viewBox={'0 0 635 921'}
      >
        <Path
          d='M168 917A129 129 0 0 1 58 780c0-20 0-23 3-33 12-37 35-65 69-82 17-8 30-11 59-12 15-1 21-1 29 1 25 5 50 19 69 37 34 33 47 79 36 124-10 40-36 69-77 88a131 131 0 0 1-78 14zm76-302a188 188 0 0 1-125-84 211 211 0 0 1-5-218c3-4 4-8 4-10a237 237 0 0 1 272-190 236 236 0 0 1 207 283c-7 39-18 68-37 97-25 39-71 77-115 95-26 11-59 18-84 18-8 0-12 1-17 3a174 174 0 0 1-64 9c-18 0-25 0-36-3z'
          stroke='none'
          strokeWidth='0'
          fill={Colors['tertiary']}
        />
        <Path
          d='M173 916c-21-3-45-12-60-23-10-7-25-23-32-33a142 142 0 0 1-15-119 126 126 0 0 1 124-87c25-1 42 3 67 17 15 8 17 10 30 22 22 22 35 50 38 84 2 15-3 40-11 57-13 30-32 49-65 66-28 13-53 19-76 16zm76-301c-54-10-99-40-129-86-17-26-27-59-32-100-3-37 7-81 28-116l5-9c0-3 11-16 20-26a1331 1331 0 0 0 20-18l7-5c5-6 36-21 55-26 30-10 72-13 100-8 34 6 64 19 89 39l16 13c10 8 35 38 40 49 6 12 14 30 17 43a185 185 0 0 1-11 132l-12 21c-13 22-32 42-52 56a304 304 0 0 1-66 33c-26 10-66 13-95 8z'
          stroke='none'
          strokeWidth='0'
          fill={Colors['secondary']}
        />
      </Svg>
    );
  }
}
