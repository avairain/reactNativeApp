import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Flex } from '@ant-design/react-native'
import Common from './Common'

@Common()
export default (p) => (WrappedComponent) => class LayoutCenter extends Component {
  render() {
    const {wrap, center, w80} = Styles(p)
    return (
      <View style={{ ...wrap }}>
        <Text style={ center }>center</Text>
        {/* <Flex justify="space-around">
          <Flex.Item style={{ ...w80, ...center }}>
            <WrappedComponent/>
          </Flex.Item>
        </Flex> */}
        <View style={{ ...w80, ...center }}>
          <WrappedComponent {...this.props}/>
        </View>
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
    textAlign: 'center'
  },
  w80: {
    width: '80%'
  }
})
