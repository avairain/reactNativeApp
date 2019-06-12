import { RnApi } from '../../assets/constants/LeftExmList'

const initState = {
  menuList: [ ...RnApi ]
}

const types = ['LOAD']
const [LOAD] = types
// actions


// reducer
export default function (state = initState, action) {
  switch (action.type) {
    case LOAD:
      
      return {
        ...state
      }
  
    default:
      return {
        ...state
      }
  }
}
