import React from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import AnecdoteList from "./components/AnecdoteList";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = props => {
  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter store={props.store} />
      <Notification store={props.store} />
      <AnecdoteForm store={props.store} />
      <AnecdoteList />
    </div>
  );
};

export default App;
