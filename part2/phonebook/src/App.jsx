import { useState, useEffect } from 'react'
import axios from 'axios'

import FilterPersons from './components/FilterPersons'
import PersonForm from './components/PersonForm'
import Person from './components/Person'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')

  useEffect(() => {
    console.log('effect')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = { name: newName, number: newNumber, id: persons.length + 1 }
    
    const repeated = persons.find(person => person.name === personObject.name)
    if (repeated) {
      alert(`${personObject.name} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
    }
    setNewName('')
    setNewNumber('')
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
      {persons.map(person => <Person key={person.id} person={person} filter={filter}/>)}
    </div>
  )
}

export default App