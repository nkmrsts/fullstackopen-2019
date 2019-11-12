import React from 'react'
import Header from '../Header'
import Contents from '../Contents'

const Course = ({ course }) => {
  return (
    <div>
      <Header title={course.name} />
      <Contents parts={course.parts}/>
    </div>
  )
}

export default Course