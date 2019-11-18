import React, { useState, useEffect } from 'react'
import personsService from './services/persons'

import Filter from './components/Filter'
import Person from './components/Person'
import PersonForm from './components/PersonForm'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personsService.getAll().then(initialPersons => {
      setPersons(initialPersons)
    })
  }, [])

  const handleSubmit = e => {
    e.preventDefault()
    const person = persons.find(person => person.name === newName)

    if (person) {
      const result = window.confirm(
        `${person.name} is already added to phonebook, replace the old number with a new one ?`
      )
      if (result) {
        updatePerson(person.id)
      }
      return
    }
    addPerson(newName, newNumber)
  }

  const addPerson = (name, number) => {
    const personObject = { name, number }
    personsService.create(personObject).then(returnedPerson => {
      setPersons(persons.concat(returnedPerson))
      clearForm()
    })
  }

  const updatePerson = id => {
    const person = persons.find(person => person.id === id)
    const changePerson = { ...person, number: newNumber }

    personsService.update(id, changePerson).then(returnedPerson => {
      setPersons(
        persons.map(person => (person.id !== id ? person : returnedPerson))
      )
      clearForm()
    })
  }

  const deletePerson = person => {
    const result = window.confirm(`Delete ${person.name} ?`)
    if (result) {
      personsService.deletePerson(person.id).then(() => {
        personsService.getAll().then(initialPersons => {
          setPersons(initialPersons)
        })
      })
    }
  }

  const clearForm = () => {
    setNewName('')
    setNewNumber('')
  }

  const filteredPersons = persons.filter(person => {
    const regexp = new RegExp(filter, 'i')
    return regexp.test(person.name)
  })

  const personRows = () =>
    filteredPersons.map(person => (
      <Person
        key={person.id}
        person={person}
        handleClick={() => deletePerson(person)}
      />
    ))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} setFilter={setFilter} />

      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      {personRows()}
    </div>
  )
}

export default App
