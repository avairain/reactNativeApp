/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Platform, StatusBar, StyleSheet, View, Text, Image, BackHandler, AppRegistry, AppState, NativeModules } from 'react-native'
// import { bindActionCreators } from 'redux'
// import { connect } from 'react-redux'
// import BackgroundJob from 'react-native-background-job'
// import PushNotification from 'react-native-push-notification'
import AppNavigator from './navigation/AppNavigator'
// import { homeActions } from './screens/actions'
import headLess from './headLess'

export default class App extends React.Component {
  constructor() {
    super()
    this.state = {
      isLoadingComplete: false,
      t: 0,
      base64: '',
      img: ''
    }
    this._changeAppState = this._changeAppState.bind(this)
    this._bgJob = this._bgJob.bind(this)
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backFn.bind(this))
    AppState.addEventListener('change', this._changeAppState)
    AppRegistry.registerHeadlessTask('SomeTaskName', () => headLess)
    const { t } = this.state
    // const backgroundJob = {
    //   jobKey: "myJob",
    //   job() {
    //     console.log(t)
    //     t++
    //     this.setState({ t })
    //   }
    // }
    // BackgroundJob.register(backgroundJob)
  }

  componentWillUnmount() {
    this.backHandler.remove()
    AppState.removeEventListener('change', this._changeAppState)
  }
  
  _bgJob(data) {
    // var backgroundSchedule = {
    //   jobKey: "myJob",
    // }
    // const _t = BackgroundJob.schedule(backgroundSchedule)
    let { t } = this.state
    t ++
    // return _t
    this.setState({ t, base64: data.result.img })
  }

  async _changeAppState(t) {
    if (t === 'background') {
      // console.log(await this._bgJob())
      AppRegistry.startHeadlessTask('SomeTaskName', 'SomeTaskName', this._bgJob)
    } else {
      this.setState({ img: this.state.base64 })
    }
  }
  backFn() {
    // console.log('back')
    // return true
  }

  render() {
    const { t, img } = this.state
    return (
      <View style={styles.container}>
        <Text>{ t }</Text>
        { img ? <Image
          source={{ uri: `data:image/jpeg;base64,${img}` }}
          style={{ width: 200, height: 200 }}
        /> : null }
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator />
      </View>
    );
  }

  _handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  _handleFinishLoading = () => {
    this.setState({ isLoadingComplete: true });
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
})

/* connect(
  state => {
    console.log(state)
    return {
      homeState: state.homeState.home
    }
  },
  dispatch => {
    return {
      homeActions: bindActionCreators(homeActions, dispatch)
    }
  }
)(App) */
