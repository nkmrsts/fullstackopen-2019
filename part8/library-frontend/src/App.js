import React, { useState } from 'react'
import AuthorsView from './components/AuthorsView'
import BooksView from './components/BookView'
import BookForm from './components/BookForm'
import { useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, EDIT_AUTHOR, ADD_BOOK, ALL_BOOKS } from './queries'

const App = () => {
  const [view, setView] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const [addBooks] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS}]
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const Notification = () => (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
    </div>
  )

  return (
    <div>
      <Notification />
      <header>
        <button onClick={() => setView('authors')}>authors</button>
        <button onClick={() => setView('books')}>books</button>
        <button onClick={() => setView('addBooks')}>add books</button>
      </header>
      {
        view === 'authors' && <AuthorsView editAuthor={editAuthor}/>
      }
      {
        view === 'books' && <BooksView />
      }
      {
        view === 'addBooks' && <BookForm addBooks={addBooks}/>
      }
    </div>
  )
}

export default App
