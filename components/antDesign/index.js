import React, { Component } from 'react'
import { View, StyleSheet, Image, Platform, TouchableOpacity, Text, TextInput } from 'react-native'
import { Button } from '@ant-design/react-native'
import LayoutCenter from '../common/LayoutCenter'


@LayoutCenter()
export class AntDButton extends Component {
  constructor() {
    super()
    this.state = {
      pic: {
        uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
      },
      label: 'Press me!'
    }
  }

  _onPress () {
    // console.log('_onPress')
  }

  pressLabel(v) {
    this.setState({
      label: v || 'has press'
    })
  }

  clearText() {
    this._textInput.setNativeProps({text: ''});
  }

  render() {
    // console.log(Platform.Version)
    const { pic, label } = this.state
    return (
        <View >
          <Button>ant Button</Button>
          <Image source={ pic } style={{width: 193, height: 110}} />
          <TouchableOpacity
            accessible={true}
            accessibilityLabel="Tap me!"
            onPress={this._onPress.bind(this)}>
            <View>
              <Text>Press me!</Text>
            </View>
          </TouchableOpacity>
          <View accessible={true}>
            <Text>text one</Text>
            <Text>text two1</Text>
          </View>
          <TouchableOpacity onPress={() => this.pressLabel()}>
            <MyButton label={ label } />
          </TouchableOpacity>
          <TextInput
            onChangeText={e => console.log(e)}
            ref={component => this._textInput = component}
            style={{ borderWidth: 1, borderColor: '#ccc' }} />
          <TouchableOpacity onPress={() => this.clearText()}>
            <MyButton label={ label } />
          </TouchableOpacity>
        </View>
    )
  }
}

class MyButton extends React.Component {
  render() {
    // console.log(this.props)
    return (
      <View>
        <Text>{this.props.label}</Text>
      </View>
    )
  }
}
