/**
 * 只看component 了解大概 详情需要去看配置
 * https://reactnative.cn/docs/activityindicator/
 */
import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, ScrollView, ActivityIndicator, StyleSheet, Button, DrawerLayoutAndroid, FlatList as FL, Image as IG, ImageBackground as IGB, KeyboardAvoidingView as KBAV, Modal as Md, Picker as PK, ProgressBarAndroid as PA, RefreshControl as RC, SectionList as SL, StatusBar as SB, Switch as Sw, ToolbarAndroid as TA, TouchableNativeFeedback as TNF, TouchableWithoutFeedback as TWF } from 'react-native'
import VPA from '@react-native-community/viewpager'
import Sl from '@react-native-community/slider'
import { connect } from 'react-redux'

import { leftExmListActions } from '../../screens/actions'
import Common from '../common/Common'
import { bindActionCreators } from 'redux';
import { Toast } from '@ant-design/react-native';

@Common()
export class Activity extends Component {
  color = '#f00'
  constructor() {
    super()
  }
  render() {
    const { color } = this
    return (
      <View>
        <Text style={styles.title}>ActivityIndicator</Text>
        <ActivityIndicator></ActivityIndicator>
        <ActivityIndicator size="small"></ActivityIndicator>
        <ActivityIndicator size="large" animating={false}></ActivityIndicator>
        <ActivityIndicator size="large" color={color}></ActivityIndicator>
      </View>
    )
  }
}

@Common()
export class Btn extends Component {
  render() {
    return (
      <View>
        <Button
          title="title"
          color="#ccc">
        </Button>
      </View>
    )
  }
}

@Common()
export class DrawerLayout extends Component {
  static navigationOptions = {
    drawerLabel: 'DrawerLayout with navigation'
  }

  renderView() {
    return (
      <View>
        <Text>123</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() =>  {
          console.log(this.props)
          this.props.navigation.push('Drawer')
          // this.props.navigation.openDrawer()
        }}><Text>DrawerLayoutAndroid</Text></TouchableOpacity>
        <DrawerLayoutAndroid
          renderNavigationView={() => this.renderView()}
          drawerPosition={DrawerLayoutAndroid.positions.Right}
          ref={(el) =>{this.drawerLayoutAndroid = el}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </DrawerLayoutAndroid>
      </View>
    )
  }
}

@Common()
export class DrawerLayout1 extends Component {
  static navigationOptions = {
    drawerLabel: 'DrawerLayout1 with navigation'
  }

  renderView() {
    return (
      <View>
        <Text>123</Text>
      </View>
    )
  }

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() =>  {
          console.log(this.props)
          this.props.navigation.push('Drawer')
          // this.props.navigation.openDrawer()
        }}><Text>DrawerLayoutAndroid1</Text></TouchableOpacity>
        {/* <DrawerLayoutAndroid
          renderNavigationView={() => this.renderView()}
          ref={(el) =>{this.drawerLayoutAndroid = el}}>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>Hello</Text>
          <Text style={{margin: 10, fontSize: 15, textAlign: 'right'}}>World!</Text>
        </DrawerLayoutAndroid> */}
      </View>
    )
  }
}

@Common()
class _FlatList extends Component {
  constructor() {
    super()
    this.renderItem = this.renderItem.bind(this)
    this._keyExtractor = this._keyExtractor.bind(this)
  }

  componentDidMount() {
    console.log(this.props)
    // this.props.loadData.loadInfo()
    const timer = setTimeout(() => {
      this.props.loadData.loadInfoSuccess()
      clearTimeout(timer)
    },3000)
  }

  _keyExtractor(item, index) {
    // console.log(arguments)
    // 唯一标识
    return item.key
  }

  renderItem(T) {
    console.log(T)
    // console.log(T.item)
    // item render 函数
    const { selected } = this.props
    console.log(this.props)
    return (
      <Text style={this.props.style}>{selected === T.item.key ? 'selected' : ''} {T.item.key}</Text>
    )
  }

  render() {
    const { list: infoList } = this.props
    const _ItemSeparatorComponent = () => <Text>1</Text> // item 之间渲染的内容
    const _ListEmptyComponent = () => <Text>empty</Text> // 空
    const _ListFooterComponent = () => <Text>footer</Text> // 尾
    const _ListHeaderComponent = () => <Text>header</Text> // 头
    console.log(infoList)
    return (
      <View>
        <FL
          data={infoList}
          renderItem={this.renderItem}
          extraData={this.props}
          ListEmptyComponent={_ListEmptyComponent /* 空 */}
          ItemSeparatorComponent={_ItemSeparatorComponent /* item 之间渲染的内容 */}
          ListHeaderComponent={_ListHeaderComponent /* 头 */}
          ListFooterComponent={_ListFooterComponent /* 尾 */}
          keyExtractor={this._keyExtractor /* 唯一标识 */}
          horizontal={false /* 不是水平布局 */}
          numColumns={2 /* 一行有多少列 horizontal=false */}
          columnWrapperStyle={styles.fl /* 每一项的样式 */}></FL>
      </View>
    )
  }
}

export const FlatList = connect(
  state => {
    return {
      ...state.wrap.leftExmList
    }
  },
  dispatch => {
    return {
      loadData: bindActionCreators(leftExmListActions, dispatch)
    }
  }
)(_FlatList)

@Common()
export class Image extends Component {
  pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  }
  render() {
    const pic = this.pic
    return (
      <View>
        <IG
          style={{ width: '50%', height: '50%'}}
          source={pic}></IG>
      </View>
    )
  }
}

@Common()
export class ImageBackground extends Component {
  pic = {
    uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
  }
  render() {
    const pic = this.pic
    return (
      <View>
        <IGB
          style={{ width: 300, height: 200}}
          source={pic}>
          <Text style={{ width: '50%', height: '50%'}}>ImageBackground</Text>
        </IGB>
      </View>
    )
  }
}

@Common()
export class KeyboardAvoidingView extends Component {
  render() {
    return (
      <View>
        <KBAV>
          <Text>TextInput</Text>
          <TextInput style={styles.fl}></TextInput>
        </KBAV>
      </View>
    )
  }
}

@Common()
class _Modal extends Component {
  constructor() {
    super()
    this.closeModal = this.closeModal.bind(this)
  }
  closeModal() {
    Toast.success('close modal', 1, null, false)
    this.props.loadData.hiddenModal()
  }

  render() {
    const { visible } = this.props
    console.log(visible)
    return (
      <View>
        <TouchableOpacity onPress={this.props.loadData.showModal}>
          <Text> Open the Modal </Text>
        </TouchableOpacity>
        <Md
          animationType="fade"
          transparent={false}
          onRequestClose={this.closeModal}
          visible={visible}>
          <View style={styles.flex}>
             <Text onPress={this.props.loadData.hiddenModal}> text in modal</Text>
          </View>
        </Md>
      </View>
    )
  }
}

export const Modal = connect(
  state => {
    return {
      visible: state.wrap.leftExmList.show
    }
  },
  dispatch => {
    return {
      loadData: bindActionCreators(leftExmListActions, dispatch)
    }
  }
)(_Modal)

@Common()
class _Picker extends Component {
  constructor() {
    super()
    this.valueChange = this.valueChange.bind(this)
  }

  valueChange(v) {
    this.props.changeValue(v)
  }

  render() {
    const { pickerValue: value, pickerList } = this.props
    return (
      <View>
        <Text> packer </Text>
        <PK
          onValueChange={this.valueChange}
          selectedValue={value}>
          {pickerList.map(v => {
            return (
              <PK.Item label={v.label} value={v.value} key={v.value}></PK.Item>
            )
          })}
        </PK>
      </View>
    )
  }
}

export const Picker = connect(
  state => {
    return {
      pickerValue: state.wrap.leftExmList.pickerValue,
      pickerList: state.wrap.leftExmList.pickerList
    }
  },
  dispatch => {
    return {
      changeValue: bindActionCreators(leftExmListActions.changePicker, dispatch)
    }
  }
)(_Picker)

@Common()
export class ProgressBarAndroid extends Component {
  value = 50
  render() {
    return (
      <View>
        <PA
          styleAttr="Horizontal"
          animating={true}
          progress={1}></PA>
      </View>
    )
  }
}

function Rn (props) {
  const goTo = v => {
    console.log(v)
    props.navigation.push(v)
  }
  const list = props.list.map(v => <Text onPress={() => goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)
  return (
    <ScrollView style={styles.container}>
     {list}
    </ScrollView>
  )
}

export default connect(
  state => {
    console.log(state)
    return { 
      list: state.wrap.leftExmList.menuList
    }
  }
)(Rn)

@Common()
class _RefreshControl extends Component {
  constructor() {
    super()
    this._changeRefreshing = this._changeRefreshing.bind(this)
  }
  timer = null
  _changeRefreshing() {
    this.props.changeRefreshing()
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      clearTimeout(this.timer)
      this.props.changeRefreshingSuccess()
    }, 1500)
  }
  renderItem(arr = []) {
    return arr.map(v => <Text key={v}>renderItem:{v}</Text>)
  }
  render() {
    console.log(this)
    const { refreshing, menuList } = this.props
    return (
      <ScrollView
        refreshControl={
          <RC
          refreshing={refreshing}
          onRefresh={this._changeRefreshing}></RC>
        }
      >
        {this.renderItem(menuList)}
        <Text>RefreshControl</Text>
      </ScrollView>
    )
  }
}

export const RefreshControl = connect(
  state => {
    return {
      refreshing: state.wrap.leftExmList.refreshing,
      menuList: state.wrap.leftExmList.list
    }
  },
  dispatch => {
    return {
      changeRefreshing: bindActionCreators(leftExmListActions.changeRefreshing, dispatch),
      changeRefreshingSuccess: bindActionCreators(leftExmListActions.changeRefreshingSuccess, dispatch)
    }
  }
)(_RefreshControl)

@Common()
class _SectionList extends Component {
  constructor() {
    super()
    this._renderItem = this._renderItem.bind(this)
  }
  _renderItem({ item, index, section }) {
    console.log(arguments)
    return (
      <Text key={index}>{section.type === 'title' && 'title ===>'} {item}</Text>
    )
  }
  render() {
    console.log(this.props)
    const { list } = this.props
    return (
      <View>
        <SL
          sections={list}
          keyExtractor={(v, i) => i.toString()}
          renderItem={this._renderItem}></SL>
      </View>
    )
  }
}

export const SectionList = connect(
  state => ({
    list: state.wrap.leftExmList.sectionList
  })
)(_SectionList)

@Common()
export class Slider extends Component {
  render() {
    return (
      <View>
        <Sl />
      </View>
    )
  }
}

// 顶部通知栏
@Common()
export class StatusBar extends Component {
  render() {
    return (
      <View>
        <Text>StatusBar</Text>
        <SB
          hidden={true}>
        </SB>
      </View>
    )
  }
}

@Common()
export class Switch extends Component {
  render() {
    return (
      <View>
        <Sw
          value={true}></Sw>
      </View>
    )
  }
}

// 工具栏
@Common()
export class ToolbarAndroid extends Component {
  TAActions = [
    {title: 'Create', icon: require('../../assets/images/robot-dev.png'), show: 'always'},
    {title: 'Filter'},
    {title: 'Settings', icon: require('../../assets/images/robot-prod.png'), show: 'always'}
  ]
  constructor() {
    super()
    this._actionSelect = this._actionSelect.bind(this)
  }
  _actionSelect(actionIndex) {
    console.log(arguments)
  }
  render() {
    return (
      <View>
        <Text>ToolbarAndroid</Text>
        <TA
          title="ToolbarAndroid"
          onActionSelected={this._actionSelect}
          actions={this.TAActions}
          style={styles.toolbar}
          subtitle="副标题"
          title="主标题">
          </TA>
      </View>
    )
  }
}

@Common()
export class TouchableNativeFeedback extends Component {
  render() {
    return (
      <View>
        <TNF>
          <View style={{width: 150, height: 100, backgroundColor: 'red'}}>
            <Text>TouchableNativeFeedback</Text>
          </View>
        </TNF>
      </View>
    )
  }
}

@Common()
export class TouchableWithoutFeedback extends Component {
  render() {
    return (
      <View>
        <Text>TouchableWithoutFeedback</Text>
        <TWF onPress={() => console.log(1)}>
          <View style={{width: 150, height: 100, backgroundColor: 'red'}}></View>
        </TWF>
      </View>
    )
  }
}

@Common()
export class ViewPagerAndroid extends Component {
  render() {
    console.log(123)
    return (
      <VPA
        style={styles.container}
        initialPage={0}>
        <View key="1">
          <Text>First page</Text>
        </View>
        <View key="2">
          <Text>Second page</Text>
        </View>
      </VPA>
    )
  }
}

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
