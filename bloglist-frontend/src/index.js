import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import './index.css'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'

const middleWares = [thunk]

const reducer = combineReducers({
  notification: notificationReducer,
  user: userReducer,
  blogs: blogsReducer
})

const store = createStore(reducer, applyMiddleware(...middleWares))

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
