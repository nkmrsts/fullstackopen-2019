import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { ALL_AUTHORS } from '../queries'
import EditAuthorForm from '../components/EditAuthorForm'

const AuthorsView = ({editAuthor}) => {
  const authors = useQuery(ALL_AUTHORS)

  if (authors.loading) {
    return <div>loading...</div>
  }
  if(authors.error) {
    return <div>{authors.error.message}</div>
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
        </thead>
        <tbody>
          {
            authors.data.allAuthors.map(author => {
              return (
                <tr key={author.name}>
                  <td>{author.name}</td>
                  <td>{author.born}</td>
                  <td>{author.bookCount}</td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <EditAuthorForm authors={authors.data.allAuthors} editAuthor={editAuthor}/>
    </div>
  )
}

export default AuthorsView