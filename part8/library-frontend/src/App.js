import React, { useState } from 'react'
import AuthorView from './components/AuthorView'
import BooksView from './components/BookView'
import BookForm from './components/BookForm'

const App = () => {
  const [view, setView] = useState('authors')
  const [errorMessage, setErrorMessage] = useState(null)

  const handleError = (error) => {
    setErrorMessage(error.message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const Views = () => {
    switch (view) {
      case 'authors':
        return <AuthorView />
      case 'books':
        return <BooksView />
      case 'addBooks':
        return <BookForm onError={handleError}/>
      default:
        return false
    }
  }

  return (
    <div>
      {errorMessage &&
        <div style={{color: 'red'}}>
          {errorMessage}
        </div>
      }
      <header>
        <button onClick={() => setView('authors')}>authors</button>
        <button onClick={() => setView('books')}>books</button>
        <button onClick={() => setView('addBooks')}>add books</button>
      </header>
      { <Views />}
    </div>
  )
}

export default App
