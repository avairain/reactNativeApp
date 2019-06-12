import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'

function RnApi({ list, navigation }) {
  const goTo = (v) => {
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

