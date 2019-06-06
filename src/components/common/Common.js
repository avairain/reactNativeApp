import React, { Component } from 'react'
import { ToastAndroid, Animated, Text, StyleSheet, Dimensions } from 'react-native'
import { shouldComponentUpdate } from 'react-addons-pure-render-mixin'

const o = Dimensions.get('window')
console.log(o)

export default () => WrappedComponent => {
  const config = Object.keys(WrappedComponent)
  class Common extends Component {
    constructor() {
      super()
      WrappedComponent.shouldComponentUpdate = shouldComponentUpdate.bind(WrappedComponent)
    }
  
    render() {
      return <WrappedComponent { ...this.props } />
    }
  }
  config.forEach(v => Common[v] = WrappedComponent[v])
  return Common
}

export const Toast = {
  message(content, time = 0.5) {
    ToastAndroid.show(content, time)
  }
}


export class OwnAnimated extends Component {
  timer = null
  constructor() {
    super()
    this.state = {
      v: new Animated.Value(0)
    }
  }
  componentDidMount() {
    Animated.timing(                  // 随时间变化而执行动画
      this.state.v,            // 动画中的变量值
      {
        toValue: 1,                   // 透明度最终变为1，即完全不透明
        duration: 1000,              // 让动画持续一段时间
        useNativeDriver: true
      }
    ).start();
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      Animated.timing(                  // 随时间变化而执行动画
        this.state.v,            // 动画中的变量值
        {
          toValue: .3,                   // 透明度最终变为1，即完全不透明
          duration: 300,              // 让动画持续一段时间
          useNativeDriver: true
        }
      ).start();
    }, 2000)
  }
  render() {
    return (
      <Animated.View                 // 使用专门的可动画化的View组件
        style={{
          ...this.props.style,
          opacity: this.state.v,         // 将透明度指定为动画变量值
        }}
      >
        {this.props.children}
        {/* <Text>123</Text> */}
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    zIndex: 99999,
    top: '100%'
    // top: o.height - 500,
    // left: '50%',
    // translateX: 50
  }
})
