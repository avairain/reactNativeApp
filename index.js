/**
 * @format
 */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'

import App from './src/App';
import {name as appName} from './app.json';
import createStore from './src/redux/configureStore'

const store = createStore()

class C extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => C);
