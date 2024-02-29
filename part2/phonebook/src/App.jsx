import { useState, useEffect } from 'react'

import personService from './services/personService'
import FilterPersons from './components/FilterPersons'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber}
    const repeated = persons.find(person => person.name === personObject.name)
    if (repeated) {
      if (window.confirm(`${personObject.name} is already added to phonebook, replace the existing number with the new one?`)) {
        personService
          .updatePerson(repeated.id, personObject)
          .then(updatedPerson => 
            setPersons(persons.map(person => person.id !== updatedPerson.id? person : updatedPerson)))
      }
    } else {
      personService
        .addPerson(personObject)
        .then(returnedPerson => setPersons(persons.concat(returnedPerson)))
    }
    setNewName('')
    setNewNumber('')
  }

  const deletePerson = (event) => {
    event.preventDefault()
    const personToDelete = persons.find(person => person.id === event.target.id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personService
      .deletePerson(personToDelete.id)
      .then(returnedPerson => 
        setPersons(persons.filter(person => person.id !== returnedPerson.id)))
    }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterPersons filter={filter} handleFilter={handleFilter}/>
      <h2>Add a new</h2>
      <PersonForm 
        addPerson={addPerson} 
        newName={newName} 
        newNumber={newNumber} 
        handleName={handleNameChange} 
        handleNumber={handleNumberChange} 
      />
      <h2>Numbers</h2>
      {persons.map(person => <Person key={person.id} person={person} filter={filter} deletePerson={deletePerson}/>)}
    </div>
  )
}

export default App