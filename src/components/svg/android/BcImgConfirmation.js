import React, { PureComponent } from 'react';
import { Dimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import { Colors } from '../../helpers/Colors';

export default class BcImgConfirmation extends React.PureComponent {
  render(props) {
    const size = Dimensions.get("window").width;
    return (
      <Svg
        style={{ height: size * 1.67, position: 'absolute', top: -30, width: size, zIndex: -1}}
        viewBox={'0 0 643 1076'}
      >
        <Path
          d='M203 1071A275 275 0 0 1 8 942l-8-12V649l5-8c14-22 40-50 63-67a388 388 0 0 1 98-52l4-10c5-18 9-28 18-49l7-14-8-16c-11-23-17-43-21-70-4-29-1-54 11-102a215 215 0 0 1 271-152c33 11 76 36 101 62 32 32 53 73 61 120l2 14 16 8 16 8v591l-8 4c-47 24-101 37-158 40l-16 1-12 14c-29 35-56 57-94 75a261 261 0 0 1-153 25z'
          stroke='none'
          strokeWidth='0'
          fill={Colors['tertiary']}
        />
        <Path
          d='M209 1070A272 272 0 0 1 1 928L0 790a3060 3060 0 0 1 3-140l4-8c17-26 46-55 73-73a336 336 0 0 1 89-45 267 267 0 0 1 223 26 269 269 0 0 1 81 393l-11 13-12 13a273 273 0 0 1-179 102c-15 2-49 2-62 0zm-15-627a232 232 0 0 1-15-183c19-71 70-125 139-148 45-14 85-15 129-1 24 8 50 21 74 38a213 213 0 0 1 88 153l-12-3a334 334 0 0 0-163-19 321 321 0 0 0-237 165l-3-2z'
          stroke='none'
          strokeWidth='0'
          fill={Colors['secondary']}
        />
      </Svg>
    );
  }
}
