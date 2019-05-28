
const initState = {
  content: 'setting'
}
const LOAD_SUCCESS = 'LOAD_SETTING'

function loadSettingAction(params) {
  return {
    type: LOAD_SUCCESS,
    params
  }
}

export function loadSetting({dispath}) {
  return dispath(loadSettingAction(''))
}

// reducer
export default function (state = initState, action) {
  switch(action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false
      }
    default:
      return {
        ...state
      }
  }
}
