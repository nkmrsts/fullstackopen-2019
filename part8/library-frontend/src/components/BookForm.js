import React, { useState } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { ADD_BOOK, ALL_BOOKS } from '../queries'

const BookForm = ({onError}) => {
  const [addBooks] = useMutation(ADD_BOOK, {
    onError: onError,
    refetchQueries: [{ query: ALL_BOOKS }]
  })

  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])
  
  const addGenres = () => {
    setGenres([...genres, genre])
    setGenre('')
  }

  const createBook = async () => {
    const res = await addBooks({
      variables: { title, author, published, genres }
    })
    if(res === undefined) return
    setTitle('')
    setAuthor('')
    setPublished('')
    setGenres([])
  }

  return (
    <div>
      <div>
        title: <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
      </div>
      <div>
        author: <input type="text" value={author} onChange={(e) => setAuthor(e.target.value)}/>
      </div>
      <div>
        published: <input type="number" value={published} onChange={(e) => setPublished(Number(e.target.value))}/>
      </div>
      <div>
        <input type="text" value={genre} onChange={(e) => setGenre(e.target.value)}/>
        <button onClick={() => addGenres()}>add genre</button>
      </div>
      <div>
        genres: {genres.join(', ')}
      </div>
      <div>
        <button onClick={() => createBook()}>create book</button>
      </div>
    </div>
  )
}

export default BookForm