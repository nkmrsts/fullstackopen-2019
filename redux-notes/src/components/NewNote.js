import React from 'react'
import { connect } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = props => {
  const addNote = event => {
    event.preventDefault()
    props.createNote(event.target.note.value)
    event.target.note.value = ''
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default connect(null, { createNote })(NewNote)
