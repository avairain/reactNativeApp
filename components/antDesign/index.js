import React, { Component } from 'react'
import { View, StyleSheet, Image, Platform, TouchableOpacity, Text } from 'react-native'
import { Button } from '@ant-design/react-native'
import LayoutCenter from '../common/LayoutCenter'


@LayoutCenter()
export class AntDButton extends Component {
  constructor() {
    super()
    this.state = {
      pic: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      }
    }
  }
  render() {
    console.log(Platform.Version)
    const { pic } = this.state
    const { style } = this.props
    return (
        <View>
          <Button style={ style }>ant Button</Button>
          <Image source={ pic } style={{width: 193, height: 110}} />
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Tap me!"
            onPress={this._onPress}>
            <View>
              <Text>Press me!</Text>
            </View>
          </TouchableOpacity>
          <View accessible={true}>
            <Text>text one</Text>
            <Text>text two1</Text>
          </View>
        </View>
    )
  }

  _onPress () {
    console.log('_onPress')
  }
}
