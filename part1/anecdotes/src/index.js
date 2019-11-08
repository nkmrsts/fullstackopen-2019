import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  
  const [point, setPoint] = useState(
    Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
  )

  const random = (maxNum) => Math.round( Math.random() * maxNum )

  const handleClickRandom = () => {
    setSelected(random(anecdotes.length -1))
  }
  const handleClickVote = () => {
    const copy = [...point]
    copy[selected]++
    setPoint(copy)
  }
  const maxPoint = Math.max(...point)
  const find = point.indexOf(maxPoint)

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <p>{props.anecdotes[selected]}</p>
      <p>has {point[selected]} vote</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={handleClickRandom}>next anecdotes</button>

      <h2>Anecdote with most vote</h2>
      <p>{props.anecdotes[find]}</p>
      <p>has {maxPoint} vote</p>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)