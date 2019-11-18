import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Results from './components/Results'

const App = () => {
  const [countries, setCountries] = useState([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
    })
  },[])

  const filteredCountries = countries.filter(country => {
    const regexp = new RegExp(query, 'i')
    return regexp.test(country.name)
  })

  return (
    <div className="App">
      <div>
        <span>find countries </span>
        <input value={query} onChange={e => setQuery(e.target.value)}></input>
      </div>
      <div>
        <Results countries={filteredCountries} setQuery={setQuery}/>
      </div>
    </div>
  )
}

export default App;
