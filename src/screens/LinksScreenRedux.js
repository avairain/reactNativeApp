import list from '../assets/constants/LeftExmList'

const initState = {
  list: [ ...list ],
  title: 'Links'
}

export function showLink () {
  return {
    type: 'SHOW_LINK'
  }
}

export default function (state = initState, action) {
  switch(action.type) {
    case 'SHOW_LINK':
      return {
        ...state,
        loading: false,
        error: false
      }
    default :
      return {
        ...state
      }
  }
}
