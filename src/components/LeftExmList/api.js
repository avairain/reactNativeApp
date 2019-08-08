import React, { PureComponent as Component } from 'react'
import { View, Text, StyleSheet, TextInput, Button, ScrollView, AccessibilityInfo as AlI, Image, Alert as A, Animated as An, AppState as AS, CameraRoll as CR, PermissionsAndroid as PA, Clipboard as CB, DatePickerAndroid as DPA, Dimensions as Ds, ImageEditor as IE, Keyboard as K, LayoutAnimation as LA, UIManager, Linking as Lk, Share as S, TimePickerAndroid as TPA , ToastAndroid as TA, Vibration as V } from 'react-native'
import PushNotification from 'react-native-push-notification'
import { MapView } from 'react-native-amap3d'
import { init, Geolocation as Gc, addLocationListener, start, stop, setInterval as sI, setNeedAddress } from "react-native-amap-geolocation"
// import IP from 'react-native-image-crop-picker'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { apiActions } from '../../screens/actions'
import { ImagePicker } from '@ant-design/react-native'

import Common from '../common/Common'
import { GetPA } from '../common/Common'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
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
    this.props.changeViewImgList(file)
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
        <ImagePicker
           onChange={this._changeFile}
           selectable={ true }
           files={ this.props.viewImgList } />
      </ScrollView>
    )
  }
}

export const CameraRoll = connect(
  state => ({
    list: state.wrap.api.imgList,
    viewImgList: state.wrap.api.viewImgList
  }),
  dispatch => ({
    changeImgList: bindActionCreators(apiActions.changeImgList, dispatch),
    changeViewImgList: bindActionCreators(apiActions.changeViewImgList, dispatch)
  })
)(_CameraRoll)


class _Clipboard extends Component {
  constructor() {
    super()
    this.getClipboard = this.getClipboard.bind(this)
  }
  async getClipboard() {
    CB.setString('hello world');
    const s = await CB.getString()
    console.log(s)
    this.props.changeClipboard(s)
  }
  render() {
    const { clipboard } = this.props
    console.log(clipboard)
    return (
      <View>
        <Text onPress={this.getClipboard}>Clipboard</Text>
        <Text>{clipboard}</Text>
      </View>
    )
  }
}

export class DatePickerAndroid extends Component {
  async componentDidMount() {
    const t = await DPA.open({
      // 要设置默认值为今天的话，使用`new Date()`即可。
      // 下面显示的会是2020年5月25日。月份是从0开始算的。
      date: new Date(2020, 4, 25)
    })
    console.log(t)
  }

  render() {
    return (
      <View>
        <Text>
          DatePickerAndroid
        </Text>
      </View>
    )
  }
}
export const Clipboard = connect(
  state => ({
    clipboard: state.wrap.api.clipboard
  }),
  dispatch => ({
    changeClipboard: bindActionCreators(apiActions.changeClipboard, dispatch)
  })
)(_Clipboard)

export class Dimensions extends Component {
  render() {
    return (
      <View>
        <Text style={styles.dimensions}>{ Ds.get('window').height }</Text>
      </View>
    )
  }
}

@GetPA()
export class Geolocation extends Component {
  constructor() {
    super()
    this.getPosition = this.getPosition.bind(this)
    this.state = {
      coords: '{}'
    }
  }

  async componentDidMount() {
    const t = await this.props.getPA(PA.PERMISSIONS.ACCESS_COARSE_LOCATION, '获取地理位置', '获取地理位置')
    if(t === PA.RESULTS.GRANTED) {
      await init({
        android: "0e43cd4343d8c84369e38276155524cf"
      });
    }
  }
  getPosition() {
    console.log('getPosition')
    addLocationListener(loc => console.log(loc))
    setNeedAddress(true)
    start()
    sI(3000)
    Gc.getCurrentPosition(({ coords }) => {
      console.log(arguments)
      console.log(coords);
      this.setState({ coords: JSON.stringify(coords) })
    });
  }

  render() {
    const { coords } = this.state
    const c = JSON.parse(coords)
    console.log(c)
    return (
      <View>
        <Text onPress={this.getPosition}>Geolocation</Text>
        <Text onPress={stop}>end</Text>
        <Text>{ coords }</Text>
        { (c.longitude && c.latitude) ? <MapView coordinate={ c } style={{...styles.dimensions}}/> : null }
      </View>
    )
  }
}

export class ImageEditor extends Component {
  static Pic = { uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }

  constructor() {
    super()
    this.cropImage = this.cropImage.bind(this)
    this.renderImage = this.renderImage.bind(this)
    this.state = {
      imgList: []
    }
  }

  cropImage() {
    IE.cropImage(
      ImageEditor.Pic.uri,
      { offset: { x: 0, y: 0 },
      size: { width: 150, height: 150 },
      displaySize: { width: 300, height: 300 },
      resizeMode: 'contain'},
      data => {
        console.log(data)
        this.setState({ imgList: [...this.state.imgList, data]})
        // todo
        // 第三方动态裁剪

        // IP.openPicker({
        //   width: 300,
        //   height: 400,
        //   cropping: true
        // }).then(image => {
        //   console.log(image)
        // }) 
      },
      err => console.log(err))
  }

  renderImage(list) {
    return list.map((v, i) => <Image key={i} style={{ width: 193, height: 110 }} source={{ uri: v }}></Image>)
  }

  render() {
    const pic = ImageEditor.Pic
    const { imgList: list } = this.state
    return (
      <View>
        <Text onPress={this.cropImage}>ImageEditor</Text>
        { this.renderImage(list) }
      </View>
    )
  }
}

// InteractionManager

export class Keyboard extends Component {
  render() {
    return (
      <View>
        <TextInput onSubmitEditing={K.dismiss}/>
      </View>
    )
  }
}

// StyleSheet

function _LayoutAnimation({ style, changeStyle }) {
  const { width, height, top, left } = style
  const fn = () => {
    console.log(LA.Types)
    LA.configureNext({
      duration: 1000,   //持续时间
      create: {
          type: LA.Types.spring,
          property: 'opacity',
          springDamping:0.4
      },
      update: {
          type: LA.Types.spring,
          springDamping: 0.4,
      }
  });
    changeStyle({ ...style, width: width + 50, height: height + 50, left: left + 50, top: top + 50 })
  }
  return (
    <View>
      <Image style={{ ...style }} source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg' }} />
      <Text onPress={fn}>LayoutAnimation</Text>
    </View>
  )
}

export const LayoutAnimation = connect(
  state => ({
    style: state.wrap.api.layoutAnimationStyle
  }),
  dispatch => ({
    changeStyle: bindActionCreators(apiActions.changeLayoutAnimationStyle, dispatch)
  })
)(_LayoutAnimation)

export class Linking extends Component {
  constructor() {
    super()
    this.telephone = this.telephone.bind(this)
    this.position = this.position.bind(this)
    this.browser = this.browser.bind(this)
    this.message = this.message.bind(this)
    this.qq = this.qq.bind(this)
    this.alipay = this.alipay.bind(this)
    this.mail = this.mail.bind(this)
    this.settings = this.settings.bind(this)
  }

  telephone() {
    console.log('telephone')
    Lk.openURL(`tel:${10086}`)
  }

  position() {
    console.log('telephone')
    Lk.openURL("geo:116.403322, 39.920255")
  }

  browser() {
    console.log('browser')
    Lk.openURL("https://www.baidu.com")
  }

  message() {
    console.log('message')
    Lk.openURL("smsto:10086")
  }

  qq() {
    console.log('qq')
    Lk.openURL("mqqwpa://im/chat?chat_type=wpa&uin=123456")
  }

  alipay() {
    console.log('alipay')
    Lk.openURL("alipayqr://platformapi/startapp?saId=10000007")
  }

  mail() {
    console.log('mail')
    Lk.openURL("mailto:753342031@qq. com")
  }

  settings() {
    console.log('settings')
    // Lk.openSettings()  // 版本太低
  }

  componentDidMount() {
    Lk.getInitialURL()
      .then(url => console.log(url))
  }

  render() {
    return (
      <ScrollView>
        <Text onPress={this.telephone}>telephone</Text>
        <Text onPress={this.position}>position</Text>
        <Text onPress={this.browser}>browser</Text>
        <Text onPress={this.message}>message</Text>
        <Text onPress={this.qq}>QQ</Text>
        <Text onPress={this.alipay}>alipay</Text>
        <Text onPress={this.mail}>mail</Text>
        <Text onPress={this.settings}>settings</Text>
      </ScrollView>
    )
  }
}

// PanResponder

// PermissionsAndroid

export class Share extends Component {
  constructor() {
    super()
    this.share = this.share.bind(this)
  }
  
  async share() {
    const t = await S.share({
      message: 'share share'
    })
    console.log(t)
  }

  render() {
    return (
      <View>
        <Text onPress={this.share}>Share</Text>
      </View>
    )
  }
}

// Systrace

export class TimePickerAndroid extends Component {
  async componentDidMount() {
    const t = await TPA.open({
      hour: 13,
      minute: 2,
      is24Hour: false
    })
    console.log(t)
  }

  render() {
    return (
      <View>
        <Text>TimePickerAndroid</Text>
      </View>
    )
  }
}

export class ToastAndroid extends Component {
  constructor() {
    super()
    this.TA = this.TA.bind(this)
  }

  TA() {
    TA.show('ToastAndroid', TA.SHORT)
  }

  render() {
    return (
      <View>
        <Text onPress={this.TA}>ToastAndroid</Text>
      </View>
    )
  }
}

// Transforms

export class Vibration extends Component {
  constructor() {
    super()
    this.vibration = this.vibration.bind(this)
    this.vibrationList = this.vibrationList.bind(this)
  }

  vibration() {
    V.vibrate(3000)
  }

  vibrationList() {
    V.vibrate([1000, 1500, 1000, 3000])
  }

  render() {
    return (
      <View>
        <Text onPress={this.vibration}>Vibration</Text>
        <Text onPress={this.vibrationList}>VibrationList</Text>
      </View>
    )
  }
}

export class Websocket extends Component {
  ws = null
  constructor() {
    super()
    this.websocket = this.websocket.bind(this)
    this.state = {
      wsm: ''
    }
  }

  componentDidMount() {
    const ws = this.ws = new WebSocket('ws://172.16.0.77:8888'); 
    console.log('start to connect')
    ws.onopen = () => {
      // 打开一个连接
      console.log('connected') // 发送一个消息
    };
    ws.onmessage = (e) => {
      // 接收到了一个消息
      console.log(e.data);
      this.setState({wsm: e.data})
    };
    
    ws.onerror = (e) => {
      // 发生了一个错误
      console.log(e);
      this.setState({wsm: e.message})
    };
    
    ws.onclose = (e) => {
      // 连接被关闭了
      console.log(e);
      this.setState({wsm: e.message})
    };
  }

  websocket() {
    const ws = this.ws
    console.log(ws)
    ws.send('123')
  }

  render() {
    const { wsm } = this.state
    return (
      <View>
        <Text onPress={this.websocket}>WebSocket</Text>
        <Text>{wsm}</Text>
      </View>
    )
  }
}

function RnApi({ list, navigation }) {
  const goTo = (v) => {
    // console.log(v)
    navigation.push(v)
  }
  return (
    <ScrollView style={{ ...styles.container }}>
      {list.map(v => <Text onPress={() => goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)}
    </ScrollView>
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
    backgroundColor: '#0f0',
    // marginBottom: 20
  },
  listStyle: {
    marginLeft: '10%',
    marginTop: '10%',
  },
  toolbar: {
    backgroundColor: '#f00',
    height: 56,
  },
  dimensions: {
    height: 500,
    backgroundColor: '#f00'
  }
})

