import React from "react";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = ({ store }) => {
  const anecdotes = store.getState().anecdotes;

  const vote = anecdote => {
    store.dispatch(voteAnecdote(anecdote.id));
    store.dispatch(setNotification(`you voted ${anecdote.content}`));
  };

  return anecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

export default AnecdoteList;
