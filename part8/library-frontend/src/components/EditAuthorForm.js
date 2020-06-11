import React, { useState } from 'react'

const EditAuthorForm = ({authors, editAuthor}) => {
  const [name, setName] = useState(authors[0] ? authors[0].name : '' )
  const [born, setBorn] = useState('')
  
  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await editAuthor({
      variables: { name, born: born.length > 0 ? Number(born) : null }
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
          <select value={name} onChange={(e) => setName(e.target.value)}>
            {
              authors.map((author,index) => (
              <option value={author.name} key={index}>{author.name}</option>
              ))
            }
          </select>
        </div>
        <div>
          borm: <input type="number" value={born} onChange={(e) => setBorn(e.target.value)}/>
        </div>
        <div>
          <button type="submit">update author</button>
        </div>
      </form>
    </div>
  )
}

export default EditAuthorForm