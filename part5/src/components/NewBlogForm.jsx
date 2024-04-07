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
            id='title-input'
            type='text'
            value={blogTitle}
            name='title'
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            id='author-input'
            type='text'
            value={blogAuthor}
            name='author'
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            id='url-input'
            type='text'
            value={blogUrl}
            name='url'
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </div>
        <button id='create-blog' type="submit">create</button>
      </form>
    </div>
  )
}

export default NewBlogForm