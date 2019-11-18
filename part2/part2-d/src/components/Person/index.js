import React from 'react'

const Person = ({ person, handleClick }) => {
  return (
    <p key={person.name}>
      {person.name} {person.number}
      <button onClick={handleClick}>delete</button>
    </p>
  )
}

export default Person
