import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthorForm = ({onError}) => {
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: onError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await editAuthor({
      variables: { name, born }
    })
    if(res === undefined) return
    setName('')
    setBorn('')
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input type="text" value={name} onChange={(e) => setName(e.target.value)}/>
        </div>
        <div>
          borm: <input type="text" value={born} onChange={(e) => setBorn(Number(e.target.value))}/>
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default EditAuthorForm