import React from 'react'
import { Provider } from 'react-redux'
import App from './components/App'
import store from './store'
import jwt_decode from 'jwt-decode'
import setAuthToken from './util/setAuthToken'
import { setCurrentUser, logOut } from './AC/authActions'
import { clearProfile } from './AC/profileActions'

if (localStorage.jwtToken) {
 
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken)
  store.dispatch(setCurrentUser(decoded))

  /// check if expired token
  const currentTime = Date.now / 1000

  if (decoded.exp < currentTime) {
    store.dispatch(clearProfile())
    store.dispatch(logOut())
    window.location.href = '/login'
  }
}

const Root = () => {
  return (
    <Provider store={ store } >
      <App />
    </Provider>  
  )
}

export default Root
