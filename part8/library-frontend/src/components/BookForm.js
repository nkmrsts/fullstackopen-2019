import React, { useState } from 'react'

const BookForm = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  if(!props.show) {
    return null
  }
  
  const addGenres = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  const createBook = async (e) => {
    e.preventDefault()
    const res = await props.addBooks({
      variables: {
        title,
        author,
        published: published.length > 0 ? Number(published) : null,
        genres
      }
    })
    if(res === undefined) return
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <form onSubmit={createBook}>
      <div>
        title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      </div>
      <div>
        published: <input type="number" value={published} onChange={(e) => setPublished(e.target.value)}/>
      </div>
      <div>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/>
        <button type="button" onClick={addGenres}>add genre</button>
      </div>
      <div>
        genres: {genres.join(', ')}
      </div>
      <div>
        <button type='submit'>create book</button>
      </div>
    </form>
  )
}

export default BookForm