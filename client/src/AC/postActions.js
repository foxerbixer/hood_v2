import { GET_ERRORS, ADD_POST, POST_LOADING,GET_POSTS, DELETE_POST, GET_POST, CLEAR_ERRORS } from'../constants'
import axios from 'axios'


// get posts
export const getPosts = () => dispatch => {
  dispatch(setPostLoading())
  axios
    .get('/api/posts')
    .then(res => dispatch({
      type: GET_POSTS,
      payload: res.data
    }))
    .catch(() => dispatch({
      type: GET_POSTS,
      payload: null
    }))
}

// add post
export const getPost = postID => dispatch => {
  dispatch(setPostLoading())
  axios
    .get(`/api/posts/${postID}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
    
} 

// add post
export const addPost = postData => dispatch => {
  dispatch(clearErrors())
  axios
    .post('/api/posts', postData)
    .then(res => dispatch({
      type: ADD_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// delete post
export const deletePost = postID => dispatch => {
  axios
    .delete(`/api/posts/${postID}`)
    .then(() => dispatch({
      type: DELETE_POST,
      payload: postID
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// add like
export const addLike = postID => dispatch => {
  axios
    .post(`/api/posts/like/${postID}`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// remove like
export const removeLike = postID => dispatch => {
  axios
    .post(`/api/posts/unlike/${postID}`)
    .then(() => dispatch(getPosts()))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// add comment
export const addComment = (postID, commentData) => dispatch => {
  dispatch(clearErrors())
  axios
    .post(`/api/posts/comment/${postID}`, commentData)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// delete comment
export const deleteComment = (postID, commentID) => dispatch => {
  axios
    .delete(`/api/posts/comment/${postID}/${commentID}`)
    .then(res => dispatch({
      type: GET_POST,
      payload: res.data
    }))
    .catch(err => dispatch({
      type: GET_ERRORS,
      payload: err.response.data
    }))
}

// set Loading
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  }
}

// clear errors

export const clearErrors = () => {
  return {
    type: CLEAR_ERRORS
  }
}


