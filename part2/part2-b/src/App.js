import React, { useState } from 'react'
import Filter from './components/Filter'
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter ] = useState('')


  const filteredPersons = persons.filter(person => {
    const regexp = new RegExp(filter, 'i')
    return regexp.test(person.name)
  })

  const isAlreadyAdded = () => {
    return persons.findIndex(person => person.name === newName) > -1
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if(newName === '') return 
    if(isAlreadyAdded()){
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = { name: newName, number: newNumber }
    setPersons(persons.concat(personObject))
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm handleSubmit={handleSubmit} newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} />

      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  )
}

export default App