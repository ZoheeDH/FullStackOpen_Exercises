import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null
let config = {}

const setToken = newToken => {
  token = `Bearer ${newToken}`
  config = {
    headers: { Authorization: token },
  }
}

const getAll = () => {
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const addBlog = async (blog) => {
  const request = await axios.post(baseUrl, blog, config)
  return request.data
}

const updateBlog = async (blog) => {
  const request = await axios.put(`${baseUrl}/${blog.id}`, blog, config)
  return request.data
}

const deleteBlog = async (id) => {
  const request = await axios.delete(`${baseUrl}/${id}`, config)
  return request.data
}

const commentBlog = async (id, comment) => {
  const request = await axios.post(`${baseUrl}/${id}/comments`, comment, config)
  return request.data
}

export default { getAll, addBlog, setToken, updateBlog, deleteBlog, commentBlog }