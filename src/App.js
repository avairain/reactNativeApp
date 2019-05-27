/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react'
import { Platform, StatusBar, StyleSheet, View, Text, BackHandler } from 'react-native'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import AppNavigator from './navigation/AppNavigator'
import { homeActions } from './screens/actions'

class App extends React.Component {
  state = {
    isLoadingComplete: false,
  }

  componentDidMount() {
    this.backHandler = BackHandler.addEventListener('hardwareBackPress', this.backFn.bind(this))
  }

  componentWillUnmount() {
    this.backHandler.remove()
  }

  backFn() {
    console.log('back')
    // return true
  }

  render() {
    // console.log(this.props)
    return (
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default" />}
        <AppNavigator {...this.props.homeActions} />
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

export default connect(
  state => {
    return {
      home: state.home.homeAction
    }
  },
  dispatch => {
    return {
      homeActions: bindActionCreators(homeActions, dispatch)
    }
  }
)(App)
