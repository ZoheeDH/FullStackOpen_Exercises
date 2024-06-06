import axios from 'axios'
const baseUrl = '/api/users'

const user = JSON.parse(window.localStorage.getItem('loggedBlogAppUser'))
const config = {}

if (user) {
  config.headers = { Authorization: `Bearer ${user.token}` }
}

const getAll = async () => {
  const response = await axios.get(baseUrl, config)
  return response.data
}

export default { getAll }