import { 
  GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES
} from '../constants'
import axios from 'axios'


// get profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile')
    .then(profile => dispatch({
        type: GET_PROFILE,
        payload: profile.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    })
}

// get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(profile => dispatch({
        type: GET_PROFILE,
        payload: profile.data
      })
    )
    .catch(err => {
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    })

}

// create profile 
export const createProfile = (profileData, history) => dispatch => {
  axios
    .post('/api/profile', profileData)
    .then(() => history.push('/settings'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/settings'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}


// add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/settings'))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// delete experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// delete education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res => dispatch({
      type: GET_PROFILE,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading())
  axios
    .get('/api/profile/all')
    .then(res => dispatch({
      type: GET_PROFILES,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_PROFILES,
      payload: null
    }))
}



// delete profile and accaunt
export const deleteProfile = () => dispatch => {
  if (window.confirm('Are you sure? This action will delete your accout')) {
    axios
    .delete('/api/profile')
    .then(() => {

      localStorage.removeItem('jwtToken')

      dispatch({
      type: SET_CURRENT_USER,
      payload: {}
    })
  })
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
  }

}

// profile loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

// clear profile from state
export const clearProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}