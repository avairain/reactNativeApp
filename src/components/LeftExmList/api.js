import React, { Component } from 'react'
import { View, Text, StyleSheet, AppRegistry, AccessibilityInfo as AlI, Alert as A, Animated as An, AppState as AS } from 'react-native'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { apiActions } from '../../screens/actions'

import Common from '../common/Common'

/*
  // 辅助视障人士 
  @Common()
  export class AccessibilityInfo extends Component {
    state = {
      reduceMotionEnabled: false,
      screenReaderEnabled: false,
    }
    componentDidMount() {
      console.dir(AlI);
      AlI.addEventListener(
        'reduceMotionChanged',
        this._handleReduceMotionToggled,
      );
      AlI.addEventListener(
        'screenReaderChanged',
        this._handleScreenReaderToggled,
      );

      AlI.isReduceMotionEnabled().thenz((reduceMotionEnabled) => {
        this.setState({reduceMotionEnabled});
      });
      AlI.isScreenReaderEnabled().then((screenReaderEnabled) => {
        this.setState({screenReaderEnabled});
      });
    }
    componentWillUnmount() {
      AlI.removeEventListener(
        'reduceMotionChanged',
        this._handleReduceMotionToggled,
      );

      AlI.removeEventListener(
        'screenReaderChanged',
        this._handleScreenReaderToggled,
      );
    }

    _handleReduceMotionToggled = (reduceMotionEnabled) => {
      console.log(reduceMotionEnabled)
      this.setState({reduceMotionEnabled});
    };

    _handleScreenReaderToggled = (screenReaderEnabled) => {
      console.log(screenReaderEnabled)
      this.setState({screenReaderEnabled});
    };
    render() {
      return (
        <View>
          <Text>AccessibilityInfo</Text>
          <Text>
            The reduce motion is{' '}
            {this.state.reduceMotionEnabled ? 'enabled' : 'disabled'}.
          </Text>
          <Text>
            The screen reader is{' '}
            {this.state.screenReaderEnabled ? 'enabled' : 'disabled'}.
          </Text>
        </View>
      )
    }
  } 
*/

@Common()
export class Alert extends Component {
  constructor() {
    super()
    this._alert = this._alert.bind(this)
  }
  _alert() {
    A.alert('title', 'message',
      [
        {text: 'button1', onPress: () => console.log('btn1')},
        {text: 'button2', onPress: () => console.log('btn2')},
        {text: 'button3', onPress: () => console.log('btn3')}
      ],
      { cancelable: false }
    )
  }
  render() {
    return (
      <Text onPress={this._alert}>Alert</Text>
    )
  }
}

@Common()
class _Animated extends Component {
  constructor() {
    super()
  }
  componentWillMount() {
    this.props.setANValue(new An.Value(0))
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps.value)
    const v = newProps.value
    console.log(v instanceof An.Value)
    if (v instanceof An.Value) {
      An.timing(
        v,
        {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true
        }
      ).start();
    }
  }
  componentDidMount() {
    console.log(this)
    // An.timing(
    //   this.props.value,
    //   {
    //     toValue: 1,
    //     duration: 2000,
    //     useNativeDriver: true
    //   }
    // ).start();
  }
  render() {
    return this.props.value ? (
      <An.View style={{ ...this.props.style, opacity: this.props.value }}>
        <Text>Animated</Text>
      </An.View>
    ) : null
  }
}

export const Animated = connect(
  state => {
    return {
      value: state.wrap.api.value
    }
  },
  dispatch => ({
    setANValue: bindActionCreators(apiActions.setANValue, dispatch)
  })
)(_Animated)

// 应用的状态   在前台还是后台
@Common()
export class AppState extends Component {
  constructor() {
    super()
    this._changeAppState = this._changeAppState.bind(this)
  }
  componentDidMount() {
    AS.addEventListener('change', this._changeAppState)
  }
  componentWillUnmount() {
    AS.removeEventListener('change', this._changeAppState)
  }
  _changeAppState() {
    console.log(1)
    console.log(AS)
    AppRegistry.registerHeadlessTask
  }
  render() {
    return (
      <View>
        <Text>AppState</Text>
      </View>
    )
  }
}

function RnApi({ list, navigation }) {
  const goTo = (v) => {
    console.log(v)
    navigation.push(v)
  }
  return (
    <View>
      {list.map(v => <Text onPress={() => goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)}
    </View>
  )
}

export default connect(
  state => ({
    list: state.wrap.api.menuList
  })
)(RnApi)

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  },
  fl: {
    borderWidth: 1,
    borderColor: 'red'
  },
  flex: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  listStyle: {
    marginLeft: '10%',
    marginTop: '10%',
  },
  toolbar: {
    backgroundColor: '#f00',
    height: 56,
  }
})

