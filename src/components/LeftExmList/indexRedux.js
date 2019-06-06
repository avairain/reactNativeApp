
const _types = ['LOAD_FLATLIST_DATA', 'SUCCESS_FLATLIST_DATA', 'ERROR_FLATLIST_DATA', 'SHOW_MODAL', 'HIDDEN_MODAL', 'CHANGE_PICKER']

const [LOAD, SUCCESS, ERROR, SHOW, HIDDEN, CHANGE] = _types

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
    default:
      return {
        ...state
      }
  }
}
