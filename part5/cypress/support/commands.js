Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('auxUser', ({ username, name, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/users`, {
    username, name, password
  })
})

Cypress.Commands.add('createAuxBlog', () => {
  const blog = {
    title: 'this can not be deleted by test',
    author: 'Cypress',
    url: 'https://example.cypress.io'
  }
  const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))
  cy.request({
    'url': `${Cypress.env('BACKEND')}/blogs`,
    'method': 'POST',
    'auth': {
      'bearer': user.token
    },
    'body': blog
  })
})

Cypress.Commands.add('createManyBlogs', () => {
  const likesNum = [10, 5, 3]

  const blogs = [{
    title: 'this blog has 15 likes',
    author: 'Cypress',
    url: 'https://example.cypress.io',
    likes: 15
  },
  {
    title: 'this blog has 10 likes',
    author: 'Cypress',
    url: 'https://example.cypress.io',
    likes: 10
  },
  {
    title: 'this blog has 5 likes',
    author: 'Cypress',
    url: 'https://example.cypress.io',
    likes: 5
  }]

  const user = JSON.parse(localStorage.getItem('loggedBlogAppUser'))

  cy.request({
    'url': `${Cypress.env('BACKEND')}/blogs`,
    'method': 'POST',
    'auth': {
      'bearer': user.token
    },
    'body': blogs[0]
  })
  cy.request({
    'url': `${Cypress.env('BACKEND')}/blogs`,
    'method': 'POST',
    'auth': {
      'bearer': user.token
    },
    'body': blogs[1]
  })
  cy.request({
    'url': `${Cypress.env('BACKEND')}/blogs`,
    'method': 'POST',
    'auth': {
      'bearer': user.token
    },
    'body': blogs[2]
  })
})
