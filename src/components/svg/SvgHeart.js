import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';
import RenderIf from '../helpers/RenderIf';

export default class SvgHeart extends React.PureComponent {
  render(props) {
    const containerStyle = {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'center',
      marginTop: 150,
    };
    const svgHeartStyle = {
      height: (this.props.size*0.3),
      width: (this.props.size*0.3),
    };
    const textStyle = {
      backgroundColor: 'transparent',
      color: '#fff',
      fontFamily: 'league-gothic',
      fontSize: 30,
      marginTop: 20,
      textAlign: 'center',
    };
    return (
      <View style={containerStyle}>
        <Svg
          style={svgHeartStyle}
          viewBox={'0 0 800 800'}
        >
          <Path
            d='M377 768l-1-24v-23h-47v-48l-23-1h-23l-1-23v-24h-24l-24-1v-46h-23l-24-1v-24l-1-24h-45v-24l-1-25H95l-1-24v-23l-24-1H46v-48H26l-22-1c-3 0-3-9-3-120V143l22-1h23v-24l1-24 23-1h24V69l1-23h189v47l23 1h23l1 24v24h23l23 1v46h46v-46l23-1h23V94l24-1h24V46h190v47l23 1h24l1 24v24h23l22 1v120l-1 120h-44l-1 24v24l-24 1h-23v48h-46l-1 24-1 24h-23l-24 1v24l-1 24-22 1-22 1-1 22v23h-23l-22 1-1 23-1 23-23 1-23 1-1 24-1 23-23 1h-24v48h-23l-24-1zM94 263v-72H48v144h23l23-1v-71zm47-97v-23H94v46h47v-23zm45-47l1-24h-46v23c0 17 1 23 2 24h43v-23z'
            stroke='none'
            strokeWidth='0'
            fill='#fff'
          />
        </Svg>
        {RenderIf(this.props.textContent,
          <Text style={textStyle}>{this.props.textContent}</Text>
        )}
      </View>
    );
  }
}
