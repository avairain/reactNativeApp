import { combineReducers } from 'redux'

import _home, * as $loadHome from './HomeScreenRedux'

export default combineReducers({
  homeAction: _home,
});

export const homeActions = $loadHome