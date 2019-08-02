import React, { PureComponent as Component } from 'react'
import { ToastAndroid, Animated, Text, StyleSheet, Dimensions, PermissionsAndroid } from 'react-native'

const o = Dimensions.get('window')
// console.log(o)

export default () => WrappedComponent => {
  const config = Object.keys(WrappedComponent)
  class Common extends Component {
    constructor() {
      super()
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
  conponentWillUpdate() {
    // console.log(this.state.v)
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

export const GetPA = (_PA) => WrappedComponent => class extends Component {
  async getPA(target, title, message) {
    console.log('getPA')
    const result = await PermissionsAndroid.request(target, {
      title,
      message,
      buttonPositive: '同意',
      // buttonNegative: '拒绝',
      // buttonNeutral: '稍后'
    })
    return result
  }
  render() {
    return (
      <WrappedComponent {...this.props} getPA={this.getPA}/>
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
