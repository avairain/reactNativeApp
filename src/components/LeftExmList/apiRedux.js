import { Animated } from 'react-native'

import { RnApi } from '../../assets/constants/LeftExmList'

const initState = {
  menuList: [ ...RnApi ],
  value: 0
}

const types = ['LOAD', 'SET_INIT_ANIMATED_VALUE', 'LOAD_ANIMATED_VALUE']
const [ LOAD, SET_INIT_ANIMATED_VALUE, LOAD_ANIMATED_VALUE ] = types
// actions

function _setANValue(v) {
  return {
    type: SET_INIT_ANIMATED_VALUE,
    value: v
  }
}

export function setANValue(v) {
  return dispatch => dispatch(_setANValue(v))
}

// reducer
export default function (state = initState, action) {
  switch (action.type) {
    case LOAD:
      
      return {
        ...state
      }
    case SET_INIT_ANIMATED_VALUE:
      return {
        ...state,
        value: action.value
      }
    // case LOAD_ANIMATED_VALUE:
    //   return {
    //     ...state
    //   }
    default:
      return {
        ...state
      }
  }
}
