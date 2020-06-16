import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { FILTER_BOOKS, ME } from '../queries'
import BooksTable from '../components/BooksTable'

const Recommend = (props) => {
  const client = useApolloClient()
  const user = useQuery(ME)
  const [books, setBooks] = useState(null)
  const [filterBooksLoading, setfilterBooksLoading] = useState(false)

  useEffect(() => {
    if(user && user.data && user.data.me.favoriteGenre) {
      const fetchBooks = async() => {
        const filterBooks = await client.query({
          query: FILTER_BOOKS,
          variables: {
            genre: user.data.me.favoriteGenre
          }
        })
        setBooks(filterBooks)
        setfilterBooksLoading(false)
      }
      setfilterBooksLoading(true)
      fetchBooks()
    }
  }, [client, user])

  if (filterBooksLoading || user.loading) {
    return <div>loading...</div>
  }
  if(user.error) {
    return <div>{(user.error && user.error.message)}</div>
  }
  if(books && books.error) {
    return <div>{(books.error && books.error.message)}</div>
  }

  return (
    <div>
      <h2>recommendatations</h2>
      <p>book in your favorite genre { user.data.me.favoriteGenre }</p>
      <BooksTable books={books && books.data && books.data.allBooks ?
            books.data.allBooks : undefined} />
    </div>
  )
}

export default Recommend