import { ADD_POST, GET_POSTS, POST_LOADING, DELETE_POST, GET_POST } from '../constants'

const initialState = {
  posts: [],
  post: {},
  isLoading: false
} 

export default (state = initialState, action) => {

  const { type, payload } = action

 switch(type) {

 case POST_LOADING:
  return {
    ...state,
    isLoading: true
  } 
  
  case GET_POSTS:
    return {
      ...state,
      posts: payload,
      isLoading: false
    }
   
  case GET_POST:
    return {
      ...state,
      post: payload,
      isLoading: false
    }

  case ADD_POST: 
    return {
      ...state,
      posts: [payload, ...state.posts]
    }
  
  case DELETE_POST:
    return {
      ...state,
      posts: [...state.posts.filter(post => post._id !== payload)]
    }  

  default:
    return state
  }
}