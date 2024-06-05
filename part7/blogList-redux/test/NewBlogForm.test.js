import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import NewBlogForm from '../src/components/NewBlogForm'

describe('<NewBlogForm />', () => {
  test('create handler is called with the right details', async () => {
    const newBlog = {
      title: 'creating a new blog',
      author: 'author',
      url: 'http://example.com',
    }

    const mockCreate = jest.fn()
    const user = userEvent.setup()

    const { container } = render(<NewBlogForm createBlog={mockCreate} />)

    const titleInput = container.querySelector('#title-input')
    const authorInput = container.querySelector('#author-input')
    const urlInput = container.querySelector('#url-input')
    const button = screen.getByText('create')

    await user.type(titleInput, newBlog.title)
    await user.type(authorInput, newBlog.author)
    await user.type(urlInput, newBlog.url)
    await user.click(button)

    expect(mockCreate.mock.calls).toHaveLength(1)
    expect(mockCreate.mock.calls[0][0]).toEqual(newBlog)
  })
})