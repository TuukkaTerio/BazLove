import React, { PureComponent } from 'react';
import { Text, View } from 'react-native';

export default class MessageListItem extends React.PureComponent {
  render(props) {
    const ListItemStyle = {
      backgroundColor: '#fff',
      borderRadius: 5,
      marginBottom: 10,
      marginLeft: 15,
      marginRight: 15,
      padding: 20,
    }
    const ListItemTextStyle = {
      fontFamily: 'open-sans',
      fontSize: 16,
    }
    return (
      <View style={ListItemStyle}>
        <Text style={ListItemTextStyle}>
          {this.props.message}
        </Text>
      </View>
    )
  }
}
