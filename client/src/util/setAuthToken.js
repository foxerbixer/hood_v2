import axios from 'axios'

const setAuthToken = token => {
  token  
  ? axios.defaults.headers.common['Authorization'] = token  // apply to every request
  : delete axios.defaults.headers.common['Authorization']   // delete auth header
}

export default setAuthToken 