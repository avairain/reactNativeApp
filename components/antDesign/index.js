import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import { Button } from '@ant-design/react-native'
import LayoutCenter from '../common/LayoutCenter'

@LayoutCenter()
export class AntDButton extends Component {
  render() {
    console.log({...this.props.style})
    return (
        <Button style={{ ...this.props.style }}>ant Button</Button>
    )
  }
}
