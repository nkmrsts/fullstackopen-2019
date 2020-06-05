import React, { useState } from 'react'
import AuthorView from './components/AuthorView'

const BooksView = () => {
  return <div>books</div>
}

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
