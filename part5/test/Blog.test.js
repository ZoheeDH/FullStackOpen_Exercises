import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from '../src/components/Blog'

let container
let mockUpdate
let mockDelete

describe('<Blog />', () => {
  beforeEach(() => {
    const blog = {
      title: 'Must show title and author',
      author: 'author name',
      url: 'http://example.com',
      user: {
        username: 'username',
        name: 'name',
        id: '1'
      }
    }

    mockUpdate = jest.fn()
    mockDelete = jest.fn()
    const username = 'username'

    container = render(
      <Blog blog={blog} update={mockUpdate} remove={mockDelete} username={username} />)
      .container
  })

  describe('initial state blog', () => {
    test('renders title and author', () => {
      const div = container.querySelector('.blog')
      expect(div).toHaveTextContent(
        'Must show title and author'
      )
    })

    test('at start the blog details are not displayed', () => {
      const div = container.querySelector('.blog-details')
      expect(div).toHaveStyle('display: none')
    })

    test('clicking on the button displays the blog details', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)

      const div = container.querySelector('.blog-details')
      expect(div).not.toHaveStyle('display: none')
    })

  })

  describe('when details are displayed', () => {
    beforeEach(async () => {
      const user = userEvent.setup()
      const button = screen.getByText('view')
      await user.click(button)
    })

    test('clicking like button twice calls the event handler twice', async () => {
      const user = userEvent.setup()
      const button = screen.getByText('like')
      await user.dblClick(button)

      expect(mockUpdate.mock.calls).toHaveLength(2)
    })
  })
})