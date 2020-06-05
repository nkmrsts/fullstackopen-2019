import React, { useState } from 'react'
import AuthorView from './components/AuthorView'
import BooksView from './components/BooksView'

const App = () => {
  const [view, setView] = useState('authors')

  return (
    <div>
      <header>
        <button onClick={() => setView('authors')}>authors</button>
        <button onClick={() => setView('books')}>books</button>
      </header>
      {
        view === 'authors' ? <AuthorView /> : <BooksView />
      }
    </div>
  )
}

export default App
