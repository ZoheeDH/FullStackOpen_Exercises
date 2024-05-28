import React, { useState, useEffect } from 'react'
import axios from 'axios'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const useCountry = (name) => {
  const [country, setCountry] = useState(null)
  const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

  useEffect(() => {
    if (name) {
      const request = axios.get(`${baseUrl}/name/${name}`)
      request
        .then(response => setCountry([{...response, found: true}]))
        .catch(setCountry([{found: false}])) 
    }
  }, [name])
  
  return country
}

const Country = ({ country }) => {
  if (!country) {
    return null
  }

  if (!country[0].found) {
    return (
      <div>
        not found...
      </div>
    )
  }

  return (
    <div>
      <h3>{country[0].data.name.common} </h3>
      <div>capital {country[0].data.capital} </div>
      <div>population {country[0].data.population}</div> 
      <img src={country[0].data.flags.svg} height='100' alt={`flag of ${country[0].data.name.common}`}/>  
    </div>
  )
}

const App = () => {
  const nameInput = useField('text')
  const [name, setName] = useState('')
  const country = useCountry(name)

  const fetch = (e) => {
    e.preventDefault()
    setName(nameInput.value)
  }

  return (
    <div>
      <form onSubmit={fetch}>
        <input {...nameInput} />
        <button>find</button>
      </form>

      <Country country={country} />
    </div>
  )
}

export default App