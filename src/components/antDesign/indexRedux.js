import { getList as getListAPI } from '../../common/interface'

const types = ['LOADING_GET_LIST', 'SUCCESS_GET_LIST', 'ERROR_GET_LIST', 'GET_LIST', 'CHANGE_LABEL']
const [LOADING, SUCCESS, ERROR, GET, CHANGELABEL] = types
const initState = {
  loading: false,
  error: false,
  infoList: [],
  label: 'Press Me!'
}
// actions
function getListAction(id) {
  return {
    type: GET,
    payload: getListAPI({id})
  }
}

function changeLabelAction(label) {
  return {
    type: CHANGELABEL,
    label
  }
}

export function changeLabel(label) {
  console.log(label)
  return (dispatch, getstate) => dispatch(changeLabelAction(label))
}

export function getList(id) {
  return (dispatch, getState) => {
    return dispatch(getListAction(id))
  }
}

// reducers
export default function (state = initState, action) {
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true
      }
    case SUCCESS:
      return {
        ...state,
        loading: false
      }
    case ERROR:
      return {
        ...state,
        error: true
      }
    case GET:
      console.log(action)
      if(action.payload.status === 200) {
        const { data } = action.payload
        if(data.status === '0000') {
          return {
            ...state,
            infoList: data.result
          }
        } else {
          return {
            ...state,
            infoList: []
          }
        }
      } else {
        console.log('!success')
        return {
          ...state,
          infoList: [],
          error: true
        }
      }
    case CHANGELABEL:
      console.log(state, action)
      return {
        ...state,
        label: action.label
      }    
    default:
      return {
        ...state
      }    
  }
}
