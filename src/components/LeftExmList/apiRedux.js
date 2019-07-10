import { Animated } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

import { RnApi } from '../../assets/constants/LeftExmList'

const RN_ASYNC_STORAGE = 'RN_ASYNC_STORAGE'

const _getStorageData = async (target) => {
  const value = await AsyncStorage.getItem(target);
  return value
}
const _setStorageData = async (target, value) => {
  if(value !== undefined) {
    const v = await AsyncStorage.setItem(target, value);
  }
  return _getStorageData(target)
}
const initState = {
  menuList: [ ...RnApi ],
  value: 0,
  asyncStorageValue: null,
  imgList: [],
  viewImgList: []
}

const types = ['LOAD', 'SET_INIT_ANIMATED_VALUE', 'LOAD_ANIMATED_VALUE', 'CHANGE_ASYNC_STORAGE', 'CHANGE_IMG_LIST', 'CHANGE_VIEW_IMG_LIST']
const [ LOAD, SET_INIT_ANIMATED_VALUE, LOAD_ANIMATED_VALUE, CHANGE_ASYNC_STORAGE, CHANGE_IMG_LIST, CHANGE_VIEW_IMG_LIST ] = types
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
    payload: _setStorageData(RN_ASYNC_STORAGE, v)
  }
}

export function changeAsyncStorage(v) {
  return (dispatch) => dispatch(_changeAsyncStorage(v))
}

function _changeImgList(v) {
  return {
    type: CHANGE_IMG_LIST,
    payload: v
  }
}

export function changeImgList(v) {
  return dispatch => dispatch(_changeImgList(v))
}

function _changeViewImgList(v) {
  return {
    type: CHANGE_VIEW_IMG_LIST,
    payload: v
  }
}

export function changeViewImgList(v) {
  return dispatch => dispatch(_changeViewImgList(v))
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
      // const v = _setStorageData(RN_ASYNC_STORAGE, action.asyncStorageValue)
      return {
        ...state,
        asyncStorageValue: action.payload
      }
    case CHANGE_IMG_LIST:
      return {
        ...state,
        imgList: [...action.payload]
      }
    case CHANGE_VIEW_IMG_LIST:
      return {
        ...state,
        viewImgList: [...action.payload]
      }
    default:
      return {
        ...state
      }
  }
}
