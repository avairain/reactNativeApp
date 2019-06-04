import React, { Component } from 'react'
import { View, StyleSheet, Image, Platform, TouchableOpacity, Text, TextInput, ToastAndroid } from 'react-native'
import { Button, Toast} from '@ant-design/react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'

import LayoutCenter from '../common/LayoutCenter'
import Ts from '../withTs/'
import { antDesignActions } from '../../screens/actions'

@LayoutCenter()
class _AntDButton extends Component {
  pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  }
  constructor() {
    super()
  }

  _onPress () {
    // console.log('_onPress')
  }

  pressLabel(v) {
    this.props.changeLabel(v || '123')
  }

  clearText() {
    // this._textInput.setNativeProps({text: ''});
    this.props.changeLabel('')
  }

  showToastNoMask() {
    console.log('Toast')
    Toast.success('Toast without mask !!!', 1, null, false)
    // ToastAndroid.show('ToastAndroid', ToastAndroid.SHORT)
  }

  render() {
    // console.log(Platform.Version)
    const { label } = this.props.antDesign
    const pic = this.pic
    return (
        <View>
          <Button onPress={() => this.showToastNoMask()}>Without mask</Button>
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
            onChangeText={e => this.pressLabel(e)}
            ref={component => this._textInput = component}
            style={{ borderWidth: 1, borderColor: '#ccc' }} />
          <TouchableOpacity onPress={() => this.clearText()}>
            <MyButton label={ label } />
          </TouchableOpacity>
          <Text>123</Text>
          <Button onPress={() => this.props.getList()}>getList</Button>
          {/* <Ts></Ts> */}
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

export const AntDButton = connect(
  state => {
    return {
      antDesign: { ...state.wrap.antDesign }
    }
  },
  dispatch => {
    return {
      ...bindActionCreators(antDesignActions, dispatch)
    }
  }
)(_AntDButton)
