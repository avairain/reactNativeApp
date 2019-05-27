import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Platform } from 'react-native'
import ThunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'
import OwnMiddleware from './httpMiddleware'
// import createFetchMiddleware from 'redux-composable-fetch';
import devToolsEnhancer, { composeWithDevTools } from 'remote-redux-devtools';

console.log(__DEV__)
const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000, hostname: 'localhost' });
const _createStore = compose(
  applyMiddleware(ThunkMiddleware, OwnMiddleware),
  // __DEV__ ? devToolsEnhancer({ realtime: true, port: 8000, hostname: 'localhost' }) : undefined
)(createStore)

console.log(rootReducer)
const reducer = combineReducers(Object.assign({}, rootReducer))

export default function (state) {
  return _createStore(reducer, state, devToolsEnhancer({ realtime: true }))
}

// view http://remotedev.io/local/
