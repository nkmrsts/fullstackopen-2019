import React from 'react'
import Part from '../Part'

const Contents = ({ parts }) => {

  const contents = parts.map(part => 
    <Part part={part} key={part.id}/>
  )

  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return (
    <div>
      {contents}
      <p>total of {total} exercises</p>
    </div>
  )
}

export default Contents