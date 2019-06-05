import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Button, DrawerLayoutAndroid, FlatList as FL } from 'react-native'
import { connect } from 'react-redux'

import { leftExmListActions } from '../../screens/actions'
import Common from '../common/Common'
import { bindActionCreators } from 'redux';

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
    // console.log()
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
    // console.log(T)
    // console.log(T.item)
    // item render 函数
    const { selected } = this.props
    return (
      <Text>{selected === T.item.key ? 'selected' : ''} {T.item.key}</Text>
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
          ListEmptyComponent={_ListEmptyComponent}
          ItemSeparatorComponent={_ItemSeparatorComponent}
          ListHeaderComponent={_ListHeaderComponent}
          ListFooterComponent={_ListFooterComponent}
          keyExtractor={this._keyExtractor}></FL>
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

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  }
})
