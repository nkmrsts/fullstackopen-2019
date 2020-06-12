import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS, ME } from '../queries'
import BooksTable from '../components/BooksTable'

const Recommend = (props) => {
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  if(!props.show) {
    return null
  }
 
  if (books.loading || user.loading) {
    return <div>loading...</div>
  }
  if(books.error || user.error) {
    return <div>{(books.error && books.error.message )|| (user.error && user.error.message)}</div>
  }

  const filteredBooks = 
    books.data.allBooks.filter(book => {
      return book.genres.includes(user.data.me.favoriteGenre)
    })

  return (
    <div>
      <h2>recommendatations</h2>
      <p>book in your favorite genre { user.data.me.favoriteGenre }</p>
      <BooksTable books={filteredBooks} />
    </div>
  )
}

export default Recommend