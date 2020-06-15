import React, { useState, useEffect } from 'react'
import AuthorsView from './components/AuthorsView'
import BooksView from './components/BooksView'
import BookForm from './components/BookForm'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { useApolloClient, useMutation } from '@apollo/react-hooks'
import { ALL_AUTHORS, EDIT_AUTHOR, ADD_BOOK, ALL_BOOKS, LOGIN } from './queries'

const App = () => {
  const client = useApolloClient()
  const [view, setView] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [timer, setTimer] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('booklist-user-token')
    if(token !== null) {
      setToken(token)
    }
  }, [])

  const handleError = (error) => {
    if(error !== null) {
      clearTimeout(timer)
    }
    setErrorMessage(error.message)
    setTimer(
      setTimeout(() => {
        setErrorMessage(null)
      }, 10000)
    )
  }

  const [addBooks] = useMutation(ADD_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }],
    update: (store, response) => {
      const booksDataInStore = store.readQuery({ query: ALL_BOOKS })
      booksDataInStore.allBooks.push(response.data.addBook)
      store.writeQuery({
        query: ALL_BOOKS,
        data: booksDataInStore
      })
    }
  })

  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  const [login] = useMutation(LOGIN, {
    onError: handleError
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

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
        {!token ?
          <button onClick={() => setView('login')}>login</button> : (
          <>
            <button onClick={() => setView('addBooks')}>add books</button>
            <button onClick={() => setView('recommend')}>recommend</button>
            <button onClick={logout}>logout</button>
          </>
          )
        }
      </header>
      {
        view === 'authors' && <AuthorsView editAuthor={editAuthor}/>
      }
      {
        view === 'books' && <BooksView/>
      }
      {
        view === 'addBooks' && <BookForm addBooks={addBooks}/>
      }
      {
        view === 'recommend' && <Recommend/>
      }
      {
        view === 'login' && <LoginForm login={login} setToken={(token) => setToken(token)} />
      }  
    </div>
  )
}

export default App
