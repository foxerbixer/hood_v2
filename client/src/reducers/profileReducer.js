import { PROFILE_LOADING, GET_PROFILE, CLEAR_CURRENT_PROFILE, GET_PROFILES } from '../constants'

const initialState = {
  profile: null,
  profiles: null,
  isLoading: false
}

export default (state = initialState, action) => {

  const { type, payload } = action

  switch(type) {

    case PROFILE_LOADING:
      return { 
        ...state,
         isLoading: true
        }

    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        isLoading: false
      }
      
    case CLEAR_CURRENT_PROFILE:
      return {
        ...state,
        profile: null
      }

    case GET_PROFILES:    
      return {
        ...state,
        profiles: payload,
        isLoading: false
      }

    default:
      return state
  }
}