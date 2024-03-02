const CountryList = ({countryName, showDetails}) => {
  return (
    <div>
      {countryName} <button id={countryName} onClick={showDetails}>show</button>
    </div>
  )
}

const Country = ({country, languages, weather}) => {
  return (
    <div>
      <h1>{country.name.common}</h1>
      capital {country.capital}
      <br/>area {country.area}
      <h3>languages:</h3>
      <ul>
        {languages.map(language => <li key={language}>{language}</li>)}
      </ul>
      <img src={country.flags.svg} alt={country.flags.alt} width='200px'/>
      <h2>Weather in {country.capital}</h2>
      temperature {weather.main.temp} Celcius
      <div>
      <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description} width='200px'/>
      </div>
      wind {weather.wind.speed} m/s
    </div>
  )
}

const Countries = ({countries, weather, onClick}) => {
  if (countries && countries.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
      )
  } else if (countries && countries.length > 1) {
    return (
      <div>
        {countries.map(country => <CountryList key={country.name.common} countryName={country.name.common} showDetails={onClick}/>)}
      </div>
      )
  } else if ((countries && countries.length > 0)) {
    const country = countries[0]
    const languages = Object.values(country.languages)
    return (
      <div>
        <Country country={country} languages={languages} weather={weather}/>
      </div>
    )
  }
}

export default Countries