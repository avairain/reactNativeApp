import React, { Component } from 'react'
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
