import React from 'react';
import { ScrollView, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { linkActions } from './actions'
import Title from '../components/common/BindTitle'
// import { ExpoLinksView } from '@expo/samples';


// @Title()
// class LinksScreen extends React.Component {
//   static navigationOptions = {
//     title: ''
//   }
//   componentWillMount() {
//     console.log(arguments)
//     console.log(this.props.linkState)
//     console.log(LinksScreen.navigationOptions)
//     Title(this.props.linkState.title)(LinksScreen)
//   }

//   render() {
//     console.log(this.props)
//     return (
//         <ScrollView style={styles.container}>
//           {/* Go ahead and delete ExpoLinksView and replace it with your
//              * content, we just wanted to provide you with some helpful links */}
//           {/* <ExpoLinksView /> */}
//           {this.mapList()}
//         </ScrollView>
//     );
//   }

//   mapList() {
//     return this.props.linkState.list.map(v => <Text onPress={() => this.goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)
//   }

//   goTo(v) {
//     this.props.navigation.push(v)
//     // this.nextTick(() => {
//       // console.log(this.props.navigation)
//     // })
//     // props.navigation.navigate
//   }
// }
function LinksScreen(props) {
  const goTo = v => props.navigation.push(v)
  const list = props.linkState.list.map(v => <Text onPress={() => goTo(v)} key={v} style={styles.listStyle}>{v}</Text>)
  return (
    <ScrollView style={styles.container}>
     {list}
    </ScrollView>
  )
}
LinksScreen.navigationOptions = {
  title: 'Links'
}

export default connect(
  state => {
    console.log(state)
    return {
      linkState: state.wrap.linkState
    }
  },
  dispatch => {
    console.log(linkActions)
    return {
      linkActions: bindActionCreators(linkActions, dispatch)
    }
  }
)(LinksScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 15,
    backgroundColor: '#fff',
  },
  listStyle: {
    marginLeft: '10%',
    marginTop: '10%',
  }
});
