import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import { Platform } from 'react-native'
import ThunkMiddleware from 'redux-thunk'

import rootReducer from './reducers'
import OwnMiddleware from './httpMiddleware'
// import createFetchMiddleware from 'redux-composable-fetch';
import devTools from 'remote-redux-devtools'

console.log(__DEV__)

const _createStore = compose(
  applyMiddleware(ThunkMiddleware, OwnMiddleware),
  __DEV__ ? devTools({
    name: Platform.OS,
    hostname: 'localhost',
    port: 8081
  }) : undefined
)(createStore)

console.log(rootReducer)
const reducer = combineReducers(Object.assign({}, rootReducer))

export default function (state) {
  return _createStore(reducer, state)
}
