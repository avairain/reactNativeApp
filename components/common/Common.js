import React, { Component } from 'react'
import { ToastAndroid } from 'react-native'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

export default () => WrappedComponent => class extends Component {
  constructor() {
    super()
    WrappedComponent.shouldComponentUpdate = shouldComponentUpdate.bind(WrappedComponent)
  }

  render() {
    return <WrappedComponent { ...this.props } />
  }
}

export const Toast = {
  message(content, time = 0.5) {
    ToastAndroid.show(content, time)
  }
}