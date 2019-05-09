import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Flex } from '@ant-design/react-native'

export default (p) => (WrappedComponent) => class LayoutCenter extends Component {
  constructor() {
    super()
    this._Styles = Styles(p)
  }
  render() {
    return (
      <View style={ this._Styles.wrap }>
        <Text style={ this._Styles.center }>center</Text>
        <Flex justify="space-around">
          <Flex.Item>
            <WrappedComponent style={{ ...this._Styles.w80, ...this._Styles.center }}/>
          </Flex.Item>
        </Flex>
      </View>
    )
  }
}
const Styles = (p) => StyleSheet.create({
  wrap: {
    display: 'flex',
    justifyContent: 'space-around',
    width: '100%',
  },
  center: {
    alignSelf: p || 'center',
  },
  w80: {
    width: '80%'
  }
})
