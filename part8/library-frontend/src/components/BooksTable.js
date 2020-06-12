import React from 'react'

const BooksTable = (props) => {
  if(!props.books) {
    return null
  }
 
  return (
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
          props.books.map((books, index) => {
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
  )
}

export default BooksTable