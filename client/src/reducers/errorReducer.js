import { GET_ERRORS, CLEAR_ERRORS } from '../constants'

const initialState = {}

export default (state = initialState, action) => {
  const { type, payload } = action

  switch(type) {
    case GET_ERRORS:
      return payload

    case CLEAR_ERRORS:
      return {}  

    default:
      return state
  }
} 