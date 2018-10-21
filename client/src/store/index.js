import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from '../reducers'

// const DEVTOOLS = window.__REDUX_DEVTOOLS_EXTENSION__()

const enhancer = applyMiddleware(thunk)

const store = createStore(rootReducer,  compose(enhancer))

export default store