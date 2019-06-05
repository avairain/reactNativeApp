
const _types = ['LOAD_FLATLIST_DATA', 'SUCCESS_FLATLIST_DATA', 'ERROR_FLATLIST_DATA']

const [LOAD, SUCCESS, ERROR] = _types

const initState = {
  list: [],
  load: false,
  error: false
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

// reducer
export default function(state = initState, action) {
  console.log(action)
  switch(action.type) {
    case LOAD:
      return {
        ...state,
        load: true,
        error: false,
      }
    case SUCCESS:
      return {
        ...state,
        list: [{key: 'a'}, {key: 'b'}].reverse(),
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
    default:
      return {
        ...state
      }
  }
}
