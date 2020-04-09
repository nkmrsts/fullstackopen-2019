import React from "react";
import ReactDOM from "react-dom";
import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import App from "./App";
import anecdoteReducer from "./reducers/anecdoteReducer";
import notificationReducer from "./reducers/notificationReducer";

const middleWares = [thunk];

const reducer = combineReducers({
  anecdotes: anecdoteReducer,
  notification: notificationReducer
});

const store = createStore(reducer, applyMiddleware(...middleWares));

const render = () =>
  ReactDOM.render(<App store={store} />, document.getElementById("root"));

render();
store.subscribe(render);
