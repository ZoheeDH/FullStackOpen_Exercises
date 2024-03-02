import axios from "axios"

const openweather = 'http://api.openweathermap.org/data/2.5'
const api_key = import.meta.env.VITE_OPENWEATHER_KEY

const getWeather = (countryCapital) => {
  const request = axios.get(`${openweather}/weather?q=${countryCapital}&appid=${api_key}&units=metric`)
  return request.then(response => response.data)
}

export default { getWeather }