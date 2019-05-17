import React, { Component } from 'react'
import { View, StyleSheet, Image,Platform } from 'react-native'
import { Button } from '@ant-design/react-native'
import LayoutCenter from '../common/LayoutCenter'


@LayoutCenter()
export class AntDButton extends Component {
  render() {
    console.log(Platform.Version)
    let pic = {
      uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    };
    return (
        <View>
          <Button style={{ ...this.props.style }}>ant Button</Button>
          <Image source={pic} style={{width: 193, height: 110}} />
        </View>
    )
  }
}
