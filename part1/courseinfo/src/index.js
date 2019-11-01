import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return (
    <h1>{props.course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  )
}

const Content = (props) => {
  return(
  <>
    <Part part={props.payload.part1} exercises={props.payload.exercises1} />
    <Part part={props.payload.part2} exercises={props.payload.exercises2} />
    <Part part={props.payload.part3} exercises={props.payload.exercises3} />
  </>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.payload.exercises1 + props.payload.exercises2 + props.payload.exercises3}</p>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course}/>
      <Content payload={
        {part1, part2, part3, exercises1, exercises2, exercises3}
      }/>
      <Total payload={
        {exercises1, exercises2, exercises3}
        }/>
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))