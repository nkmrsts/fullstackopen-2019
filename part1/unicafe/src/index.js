import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = props =>
  <button onClick={props.handleClick}>{props.text}</button>

const Statistics = ({payload}) => {
  const {good, neutral, bad} = payload

  const total = good + neutral + bad
  const score = (good - bad) / total
  const positive = good / total * 100
  
  if(total === 0) {
    return <p>No feedback given</p>
  }
  return (
    <table>
      <tbody>
        <Statistic text="good" value={good} />
        <Statistic text="neutral" value={neutral} />
        <Statistic text="bad" value={bad} />
        <Statistic text="all" value={total} />
        <Statistic text="average" value={score} />
        <Statistic text="positive" value={`${positive} %`} />
      </tbody>
    </table>
  )
}

const Statistic = props => (
  <tr>
    <th align="left">{props.text}</th>
    <td>{props.value}</td>
  </tr>
)

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h2>give feedback</h2>
      <Button text="good" handleClick={() => setGood(good + 1)} />
      <Button text="neutral" handleClick={() => setNeutral(neutral + 1)} />
      <Button text="bad" handleClick={() => setBad(bad + 1)} />
      <h2>statistics</h2>
      <Statistics payload={{good, neutral, bad}} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)