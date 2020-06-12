import React, { useState } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS } from '../queries'
import BooksTable from '../components/BooksTable'

const BooksView = () => {
  const books = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
 
  if (books.loading) {
    return <div>loading...</div>
  }
  if(books.error) {
    return <div>{books.error.message}</div>
  }

  const filteredBooks = filter === null ?
    books.data.allBooks :
    books.data.allBooks.filter(book => {
      return book.genres.includes(filter)
    })

  const genres = books.data.allBooks.reduce((accumulator, book) => {
    const newGenres = book.genres.filter(genre => {
       return !accumulator.includes(genre)
    })
    return [...accumulator, ...newGenres]
  },[])

  const handleClick = (value) => {
    if(filter === value) {
      setFilter(null)
    } else {
      setFilter(value)
    }
  }

  return (
    <div>
      <h2>books</h2>
      <p>in genre {
        filter === null ? 'All' : filter
      }</p>
      <BooksTable books={filteredBooks} />
      {genres.map(genre=>(
        <button onClick={()=>handleClick(genre)} key={genre}>{genre}</button>
      ))
      }
    </div>
  )
}

export default BooksView