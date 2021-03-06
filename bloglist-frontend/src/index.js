import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import App from './App'
import './index.css'
import notificationReducer from './reducers/notificationReducer'
import loginUserReducer from './reducers/loginUserReducer'
import usersReducer from './reducers/usersReducer'
import userReducer from './reducers/userReducer'
import blogsReducer from './reducers/blogsReducer'

const middleWares = [thunk]

const reducer = combineReducers({
  notification: notificationReducer,
  loginUser: loginUserReducer,
  users: usersReducer,
  user: userReducer,
  blogs: blogsReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  reducer,
  composeEnhancers(applyMiddleware(...middleWares))
)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
