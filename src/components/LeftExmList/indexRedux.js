import { Rn } from '../../assets/constants/LeftExmList'

const _types = ['LOAD_FLATLIST_DATA', 'SUCCESS_FLATLIST_DATA', 'ERROR_FLATLIST_DATA', 'SHOW_MODAL', 'HIDDEN_MODAL', 'CHANGE_PICKER', 'CHANGE_REFRESHING', 'CHANGE_REFRESHING_SUCCESS']

const [LOAD, SUCCESS, ERROR, SHOW, HIDDEN, CHANGE, CHANGE_REFRESHING, CHANGE_REFRESHING_SUCCESS] = _types

const initState = {
  list: [],
  load: false,
  error: false,
  show: false,
  pickerValue: '',
  pickerList: [
    {
      label: 'Java',
      value: 'java'
    },
    {
      label: 'JavaScript',
      value: 'js'
    }
  ],
  menuList: [ ...Rn ],
  refreshing: false,
  sectionList: [
    { title: "Title1", data: ["item1", "item2"], type: 'title' },
    { title: "Title2", data: ["item3", "item4"] },
    { title: "Title3", data: ["item5", "item6"] }
  ]
}

function _loadInfo() {
  return {
    type: LOAD
  }
}

export function loadInfo() {
  return (dispatch, getState) => {
    return dispatch(_loadInfo())
  }
}

function _loadInfoSuccess() {
  return {
    type: SUCCESS
  }
}

export function loadInfoSuccess() {
  return (dispatch, getState) => {
    return dispatch(_loadInfoSuccess())
  }
}

function _loadInfoError() {
  return {
    type: ERROR
  }
}

export function loadInfoError() {
  return (dispatch, getState) => {
    return dispatch(_loadInfoError())
  }
}

function _showModal () {
  return {
    type: SHOW
  }
}

export function showModal() {
  return (dispatch) => {
    return dispatch(_showModal())
  }
}

function _hiddenModal () {
  return {
    type: HIDDEN
  }
}

export function hiddenModal() {
  return (dispatch) => {
    return dispatch(_hiddenModal())
  }
}

function _changePicker(v) {
  return {
    type: CHANGE,
    text: v
  }
}

export function changePicker(v) {
  return (dispatch) => {
    return dispatch(_changePicker(v))
  }
}

function _changeRefreshing(v) {
  return {
    type: CHANGE_REFRESHING
  }
}

export function changeRefreshing(v) {
  return (dispatch) => dispatch(_changeRefreshing(v))
}

function _changeRefreshingSuccess(v) {
  return {
    type: CHANGE_REFRESHING_SUCCESS
  }
}

export function changeRefreshingSuccess(v) {
  return (dispatch) => dispatch(_changeRefreshingSuccess(v))
}

// reducer
export default function(state = initState, action) {
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        // list: [],
        load: true,
        error: false,
      }
    case SUCCESS:
      return {
        ...state,
        list: [{key: 'a'}, {key: 'b'}, {key: 'c'}, {key: 'd'}].reverse(),
        selected: 'a',
        load: false,
        error: false,
      }
    case ERROR:
      return {
        ...state,
        load: false,
        error: true,
      }
    case SHOW:
      return {
        ...state,
        show: true
      }
    case HIDDEN:
      return {
        ...state,
        show: false
      }
    case CHANGE:
      return {
        ...state,
        pickerValue: action.text
      }
    case CHANGE_REFRESHING:
      return {
        ...state,
        refreshing: !state.refreshing
      }
    case CHANGE_REFRESHING_SUCCESS:
      return {
        ...state,
        refreshing: !state.refreshing,
        list: state.menuList.reverse()
      }
    default:
      return {
        ...state
      }
  }
}
