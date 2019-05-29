/**
 * @format
 */

 /**
  * 
  * 
    "remote-redux-devtools": "^0.5.16",
    "remotedev-rn-debugger": "^0.8.4",
    "postinstall": "remotedev-debugger --hostname localhost --port 8081 --injectserver"
  */
import React, { Component } from 'react'
import { AppRegistry } from 'react-native';
import { Provider } from 'react-redux'

import App from './src/App';
import {name as appName} from './app.json';
import createStore from './src/redux/configureStore'
import { Provider as Pro } from '@ant-design/react-native';

const store = createStore()

class C extends Component {
  constructor() {
    super()
  }
  render() {
    return (
      <Provider store={store}>
        <Pro>
          <App />
        </Pro>
      </Provider>
    )
  }
}

AppRegistry.registerComponent(appName, () => C);
