import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_BOOKS } from '../queries'

const BooksView = () => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return <div>loading...</div>
  }
  if(books.error) {
    return <div>{books.error.message}</div>
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
        </thead>
        <tbody>
          {
            books.data.allBooks.map((books, index) => {
              return (
                <tr key={index}>
                  <td>{books.title}</td>
                  <td>{books.author.name}</td>
                  <td>{books.published}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
    </div>
  )
}

export default BooksView