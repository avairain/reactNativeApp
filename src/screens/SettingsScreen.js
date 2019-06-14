import React from 'react';
import { View, Text } from 'react-native'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { settingActions } from './actions'
// import { ExpoConfigView } from '@expo/samples';

// export default class SettingsScreen extends React.Component {
//   static navigationOptions = {
//     title: 'app.json',
//   };

//   render() {
//     /* Go ahead and delete ExpoConfigView and replace it with your
//      * content, we just wanted to give you a quick view of your config */
//     return (
//       <View>
//         {/* <ExpoConfigView /> */}
//         <Text>SETTINGS</Text>
//       </View>
//     )
//   }
// }
function SettingScreen({settingActions, settingState}) {
  return (
    <View>
      <Text>{settingState.content}</Text>
    </View>
  )
}
SettingScreen.navigationOptions = {
  title: 'Set'
}

export default connect(
  state => {
    return {
      settingState: state.wrap.settingState
    }
  },
  dispatch => ({
    settingActions: bindActionCreators(settingActions, dispatch)
  })
)(SettingScreen)
