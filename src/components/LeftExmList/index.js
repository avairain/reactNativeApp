import React, { Component } from 'react'
import { View, Text, ActivityIndicator } from 'react-native'

export class Activity extends Component {
  render() {
    return (
      <View>
        <Text>ActivityIndicator</Text>
        <ActivityIndicator></ActivityIndicator>
      </View>
    )
  }
}
