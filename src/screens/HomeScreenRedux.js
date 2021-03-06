import { commonArticles } from '../redux/mapActions'

function ADD_ARTICLES (params) {
  return {
    url: '/api/articles.json',
    method: 'post',
    name: 'http',
    status: ['DELETE_ARTICLES', 'DELETE_ARTICLES_SUCCESS', 'DELETE_ARTICLES_ERROR'],
    payload: JSON.stringify(params)
  }
}

export function loadHome() {
  return (dispatch, getState) => {
    const { title, desc, date } = getState();
    return dispatch(ADD_ARTICLES({ title, desc, date }));
  };
}

export function showHome() {
  return (dispatch, getState) => {
    return dispatch({
      type: 'SHOW_HOME'
    })
  }
}

export default function home(state = {}, action) {
  if (/^DELETE/i.test(action.type)) {
    return commonArticles('DELETE', state)(state, action)
  }
  switch (action.type) {
    case 'SHOW_HOME': {
      return {
        ...state,
        img: (__DEV__) ? require('../assets/images/robot-dev.png') : require('../assets/images/robot-prod.png'),
        visible: true,
        error: false
      };
    }

    case 'HIDE_MODAL': {
      return {
        ...state,
        visible: false,
        error: false
      };
    }

    case 'ADD_ARTICLES': {
      return {
        ...state,
        visible: true,
        error: false
      }
    }
    case 'ADD_ARTICLES_SUCCESS': {
      return {
        ...state,
        visible: false,
        error: false
      }
    }
    case 'ADD_ARTICLES_ERROR': {
      return {
        ...state,
        visible: true,
        error: true
      }
    }
    default:
      return {
        ...state
      };
  }
}