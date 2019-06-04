import React, { Component } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, StyleSheet, Button, DrawerLayoutAndroid } from 'react-native'
import Common from '../common/Common'

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

const styles = StyleSheet.create({
  title: {
    textAlign: 'center'
  }
})
