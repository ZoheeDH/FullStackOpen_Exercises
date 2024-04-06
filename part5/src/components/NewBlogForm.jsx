import { useState } from 'react'

const NewBlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl
    })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <h2>Add a new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
          <input
            type='text'
            value={blogTitle}
            name='title'
            onChange={({ target }) => setBlogTitle(target.value)}
            id='title-input'
          />
        </div>
        <div>
          author:
          <input
            type='text'
            value={blogAuthor}
            name='author'
            onChange={({ target }) => setBlogAuthor(target.value)}
            id='author-input'
          />
        </div>
        <div>
          url:
          <input
            type='text'
            value={blogUrl}
            name='url'
            onChange={({ target }) => setBlogUrl(target.value)}
            id='url-input'
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm