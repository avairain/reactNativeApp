import { Animated } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { RnApi } from '../../assets/constants/LeftExmList'

const RN_ASYNC_STORAGE = 'RN_ASYNC_STORAGE'

const initState = {
  menuList: [ ...RnApi ],
  value: 0,
  asyncStorageValue: (async () => {
    const value = await AsyncStorage.getItem(RN_ASYNC_STORAGE)
    console.log(value)
    return value
  })() 
}

const types = ['LOAD', 'SET_INIT_ANIMATED_VALUE', 'LOAD_ANIMATED_VALUE', 'CHANGE_ASYNC_STORAGE']
const [ LOAD, SET_INIT_ANIMATED_VALUE, LOAD_ANIMATED_VALUE, CHANGE_ASYNC_STORAGE ] = types
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

function _changeAsyncStorage(v) {
  return {
    type: CHANGE_ASYNC_STORAGE,
    asyncStorageValue: v
  }
}

export function changeAsyncStorage(v) {
  console.log(v)
  return (dispatch) => dispatch(_changeAsyncStorage(v))
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
    case CHANGE_ASYNC_STORAGE:
      AsyncStorage.setItem(RN_ASYNC_STORAGE, action.asyncStorageValue)
      return {
        ...state,
        asyncStorageValue: action.asyncStorageValue
      }
    default:
      return {
        ...state
      }
  }
}
