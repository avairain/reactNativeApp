import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, AccessibilityInfo as AlI, Image, Alert as A, Animated as An, AppState as AS, CameraRoll as CR, PermissionsAndroid as PA } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { apiActions } from '../../screens/actions'
import { ImagePicker } from '@ant-design/react-native'

import Common from '../common/Common'
import { GetPA } from '../common/Common'

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
        {text: 'button1', onPress: () => 'btn1'},
        {text: 'button2', onPress: () => 'btn2'},
        {text: 'button3', onPress: () => 'btn3'}
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
    const v = newProps.value
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
  }
  render() {
    return (
      <View>
        <Text>AppState</Text>
      </View>
    )
  }
}

@Common()
export class Notification extends Component {
  timer = null
  componentDidMount() {
    // AppRegistry.registerHeadlessTask()
    clearInterval(this.timer)
    this.timer = setInterval(() => {
      PushNotification.localNotification({
        bigText: 'bigText',
        subText: 'subText',
        title: 'title',
        message: 'message'
      })
      clearInterval(this.timer)
    }, 3000);
  }
  componentWillUnmount() {
    clearInterval(this.timer)
  }
  render() {
    return (
      <View>
        <Text>PushNotification</Text>
      </View>
    )
  }
}

@Common()
class _AsyncStorage extends Component {
  constructor() {
    super()
    this._changeValue = this._changeValue.bind(this)
  }
  componentDidMount() {
    this.props.changeAsyncStorage()
  }
  _changeValue(v) {
    this.props.changeAsyncStorage(v)
  }
  render() {
    const { value } = this.props
    return (
      <View>
        <Text>AsyncStorage</Text>
        <TextInput
          style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
          onChangeText={this._changeValue}
          value={value}/>
          <Text>{ value }</Text>
      </View>
    )
  }
}

export const AsyncStorage = connect(
  state => {
    return {
      value: state.wrap.api.asyncStorageValue
    }
  },
  dispatch => ({
    changeAsyncStorage: bindActionCreators(apiActions.changeAsyncStorage, dispatch)
  })
)(_AsyncStorage)

@GetPA()
@Common()
class _CameraRoll extends Component {
  constructor() {
    super()
    this._getCameraRoll = this._getCameraRoll.bind(this)
    this._chenckPA = this._chenckPA.bind(this)
    this._changeFile = this._changeFile.bind(this)
  }
  async _chenckPA() {
    console.log(PA.PERMISSIONS.READ_EXTERNAL_STORAGE)
    // console.log(PA.RESULTS.GRANTED)
    const canRead  = await PA.check(PA.PERMISSIONS.READ_EXTERNAL_STORAGE)
    console.log(canRead)
    if (!canRead) {
      const result = await this.props.getPA(PA.PERMISSIONS.READ_EXTERNAL_STORAGE, '相册权限', '申请相册权限')
      console.log(result)
    } else {
      CR.getPhotos({
        first: 5,
        // groupTypes: 'All',
        assetType: 'Photos'
      })
      .then(data => {
        console.log(data)
        this.props.changeImgList(data.edges)
      })
      .catch(err => {
        throw err
      })
    }
  }
  _getCameraRoll() {
    console.log('loading')
    this._chenckPA()
    // CR.getPhotos({
    //   first: 5,
    //   // groupTypes: 'All',
    //   assetType: 'Photos'
    // })
    // .then(data => {
    //   // console.log(data)
    //   this.props.changeImgList(data.edges)
    // })
    // .catch(err => {
    //   throw err
    // })
  }
  _changeFile(file) {
    console.log(file)
  }
  render() {
    return (
      <ScrollView>
        <Text>CameraRoll</Text>
        <Button
          onPress={this._getCameraRoll}
          title="press me!"></Button>
          {/* <ScrollView>
            {this.props.list.map((p, i) => {
             return (
               <Image
                 key={i}
                 style={{
                  width: p.node.image.width,
                  height: p.node.image.height
                 }}
                 source={{ uri: p.node.image.uri }}
               />
             );
           })}
         </ScrollView> */}
         <ImagePicker onChange={this._changeFile} files={this.props.list.map(v => ({...v.node.image, url: v.node.image.uri}))} />
      </ScrollView>
    )
  }
}

export const CameraRoll = connect(
  state => ({
    list: state.wrap.api.imgList
  }),
  dispatch => ({
    changeImgList: bindActionCreators(apiActions.changeImgList, dispatch)
  })
)(_CameraRoll)

function RnApi({ list, navigation }) {
  const goTo = (v) => {
    // console.log(v)
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

