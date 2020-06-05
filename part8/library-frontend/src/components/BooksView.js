import React from 'react'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const ALL_BOOKS = gql`
{
  allBooks  {
    title
    author
    published
  }
}
`

const BooksView = () => {
  const books = useQuery(ALL_BOOKS)

  if (books.loading) {
    return <div>loading...</div>
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
            books.data.allBooks.map(books => {
              return (
                <tr key={books.title}>
                  <td>{books.title}</td>
                  <td>{books.author}</td>
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