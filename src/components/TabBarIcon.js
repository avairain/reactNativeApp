import React from 'react';
import { View, Text } from 'react-native';

import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <View
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      >
        <Text>TabBar</Text>
      </View>
    );
  }
}