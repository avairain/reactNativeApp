import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import ThunkMiddleware from 'redux-thunk'
import reduxPromise from 'redux-promise'

import rootReducer from './reducers'
import OwnMiddleware from './httpMiddleware'
// import createFetchMiddleware from 'redux-composable-fetch';
import devToolsEnhancer, { composeWithDevTools } from 'remote-redux-devtools';

const composeEnhancers = composeWithDevTools({ realtime: true, port: 8000, hostname: 'localhost' });
const _createStore = compose(
  applyMiddleware(ThunkMiddleware, OwnMiddleware, reduxPromise),
  // __DEV__ ? devToolsEnhancer({ realtime: true, port: 8000, hostname: 'localhost' }) : undefined
)(createStore)

const reducer = combineReducers(Object.assign({}, rootReducer))

export default function (state) {
  return _createStore(reducer, state, devToolsEnhancer({ realtime: true }))
}

// view http://remotedev.io/local/
