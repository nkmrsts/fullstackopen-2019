import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS, FILTER_BOOKS } from '../queries'
import BooksTable from '../components/BooksTable'

const BooksView = () => {
  const client = useApolloClient()
  const allBooks = useQuery(ALL_BOOKS)
  const [filter, setFilter] = useState(null)
  const [books, setBooks] = useState(null)
  const [filterBooksLoading, setfilterBooksLoading] = useState(false)

  useEffect(() => {
    if(filter !== null) {
      const fetchFilterBooks = async() => {
        const filterBooks = await client.query({
          query: FILTER_BOOKS,
          variables: {
            genre: filter
          }
        })
        setBooks(filterBooks)
        setfilterBooksLoading(false)
      }
      setfilterBooksLoading(true)
      fetchFilterBooks()
    }
  }, [client, filter])

  if (allBooks.loading || filterBooksLoading) {
    return <div>loading...</div>
  }
  if(allBooks && allBooks.error) {
    return <div>{allBooks.error.message}</div>
  }

  const genres = allBooks.data.allBooks.reduce((accumulator, book) => {
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
      <BooksTable books={
        filter !== null ?
          books && books.data && books.data.allBooks ?
            books.data.allBooks : undefined
            :
          allBooks.data.allBooks
      }/>
      {genres && genres.map(genre=>(
        <button onClick={()=>handleClick(genre)} key={genre}>{genre}</button>
      ))
      }
    </div>
  )
}

export default BooksView