import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { FILTER_BOOKS, ME } from '../queries'
import BooksTable from '../components/BooksTable'

const Recommend = (props) => {
  const user = useQuery(ME)
  const books = useQuery(FILTER_BOOKS, {
    variables: {
      genre: user && user.data && user.data.me.favoriteGenre ?
        user.data.me.favoriteGenre : undefined
    }
  })

  if (books.loading || user.loading) {
    return <div>loading...</div>
  }
  if(books.error || user.error) {
    return <div>{(books.error && books.error.message )|| (user.error && user.error.message)}</div>
  }

  return (
    <div>
      <h2>recommendatations</h2>
      <p>book in your favorite genre { user.data.me.favoriteGenre }</p>
      <BooksTable books={books.data.allBooks} />
    </div>
  )
}

export default Recommend