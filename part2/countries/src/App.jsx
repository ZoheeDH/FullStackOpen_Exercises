import countryService from './services/countryService'
import weatherService from './services/weatherService'
import { useState, useEffect } from 'react'
import Countries from './components/Countries'

const App = () => {
  const [search, setSearch] = useState('')
  const [countries, setCountries] = useState(null)
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    if (search) {
      countryService.getAll(search)
      .then(filteredCountries => setCountries(filteredCountries))
      .catch(err => <p>There was an error with the search: {err.message}</p>)
    }
  }, [search])

  useEffect(() => {
    if (countries && countries.length === 1) {
      weatherService.getWeather(countries[0].capital)
     .then(weather => setWeatherData(weather))
     .catch(err => <p>There was an error while fetching the weather data: {err.message}</p>)
    }
  }, [countries])

  const handleSearch = (event) => {
    setSearch(event.target.value)
  }

  const handleClick = (event) => {
    event.preventDefault();
    countryService.getOne(event.target.id)
      .then(country => setCountries(country))
  }

  return (
    <div>
      find countries <input type="text" value={search} onChange={handleSearch}/>
      <Countries countries={countries} onClick={handleClick} weather={weatherData} />
    </div>
  )
}

export default App
