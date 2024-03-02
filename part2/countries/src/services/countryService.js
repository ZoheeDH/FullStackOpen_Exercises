import axios from 'axios'


const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'

const getAll = (search) => {
  const request = axios.get(`${baseUrl}/all`)
  return request.then(response => response.data.filter(
    country => country.name.common.toLowerCase().includes(search.toLowerCase())))
}

const getOne = (name) => {
  const request = axios.get(`${baseUrl}/name/${name}`)
  return request.then(response => [response.data])
}

export default { getAll, getOne }