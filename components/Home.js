import React, { Component } from 'react'
import { View, Button } from 'react-native'

export default class Home extends Component {
  render() {
    return (
      <View>
        <Button title="home" onPress={this.pressButton.bind(this)}></Button>
      </View>
    )
  }
  pressButton() {
    console.log(1)
  }
}