import React from "react";
import { connect } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = props => {
  const vote = anecdote => {
    props.voteAnecdote(anecdote.id);
    props.setNotification(`you voted ${anecdote.content}`);
  };

  return props.visibleAnecdotes.map(anecdote => (
    <div key={anecdote.id}>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={() => vote(anecdote)}>vote</button>
      </div>
    </div>
  ));
};

const anecdotesToShow = ({ anecdotes, filter }) => {
  return filter
    ? anecdotes.filter(anecdote => anecdote.content.indexOf(filter) > -1)
    : anecdotes;
};

const mapStateToProps = state => {
  console.log(state);
  return {
    visibleAnecdotes: anecdotesToShow(state),
    filter: state.filter
  };
};

const mapDispatchToProps = {
  voteAnecdote,
  setNotification
};

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList);
