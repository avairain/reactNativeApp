import axios from 'axios'

const DOMAIN = 'http://140.143.239.174:6060'

const API_PATH_GETLIST = `${DOMAIN}/getList`

export function getList(params) {
  return _post(
    API_PATH_GETLIST,
    params
  )
}


function _post(_url, params = {}, header = {}) {
  return axios.post(_url, params, header)
}

function _get(_url, params) {
  return axios.get(_url, params, header)
}
