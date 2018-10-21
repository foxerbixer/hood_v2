import axios from 'axios'
import setAuthToken from '../util/setAuthToken'
import jwt_decode from 'jwt-decode'
import { GET_ERRORS, SET_CURRENT_USER } from '../constants'

// register user
export const registerUser = (userData, history) => dispatch => {
  axios.post('/api/users/register', userData)
    .then(res => history.push('/login'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

 
// login  get user token
export const loginUser = userData => dispatch => {
  axios.post('/api/users/login', userData)
    .then(res => {
      const { token } = res.data
      
      localStorage.setItem('jwtToken', token)      // save token to localStorage
  
      setAuthToken(token)                          // put token to headers

      const decoded = jwt_decode(token)            // get user data

      dispatch(setCurrentUser(decoded))            // set current user
    })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// set logged in user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}


// logOut
export const logOut = history => dispatch => {
  localStorage.removeItem('jwtToken')               // delte token from localstorage
  setAuthToken(false)                               // delete token from request headers
  dispatch(setCurrentUser({}))                 // set isAuthenticated to false
}








    // axios.post('/api/users/register', newUser)
    //   .then(res => console.log(res.data))
    //   .catch(err => this.setState({ errors: err.response.data }))