import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Flex } from '@ant-design/react-native'
import Common from './Common'

@Common()
export default (p) => (WrappedComponent) => class LayoutCenter extends Component {
  render() {
    const {wrap, center, w80} = Styles(p)
    return (
      <View style={ wrap }>
        <Text style={ center }>center</Text>
        <Flex justify="space-around">
          <Flex.Item>
            <WrappedComponent style={{ ...w80, ...center }}/>
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
