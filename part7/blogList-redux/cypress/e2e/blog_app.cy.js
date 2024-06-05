describe('Blog App', function() {
  describe('Login', function() {
    beforeEach(function() {
      cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
      const user = {
        username: 'test',
        name: 'test',
        password: 'pwtest'
      }
      cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)

      cy.visit('')
    })

    it('Login form is shown', function() {
      cy.contains('Login')
      cy.get('#username')
      cy.get('#password')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('test')
      cy.get('#password').type('pwtest')
      cy.get('#login-button').click()

      cy.contains('test logged in')
    })

    it('fails with wrong username', function(){
      cy.get('#username').type('wrongUsername')
      cy.get('#password').type('pwtest')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })

    it('fails with wrong password', function(){
      cy.get('#username').type('test')
      cy.get('#password').type('wrongPassword')
      cy.get('#login-button').click()

      cy.get('.notification')
        .should('contain', 'Wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'test', password: 'pwtest' })
    })

    it('a blog can be created', function() {
      cy.contains('test logged in')

      cy.get('#add-blog').click()
      cy.get('#title-input').type('adding a new blog')
      cy.get('#author-input').type('cypress')
      cy.get('#url-input').type('https://example.com')
      cy.get('#create-blog').click()

      cy.contains('adding a new blog')
    })

    it('a blog can be liked', function(){
      cy.contains('view').click()
      cy.contains('likes 0')

      cy.get('.like-button').click()
      cy.contains('likes 1')
    })

    it('a blog can be deleted by the user who added it', function() {
      cy.contains('view').click()
      cy.get('#remove-blog').click()

      cy.contains('adding a new blog').should('not.exist')
    })

    it('remove button does not show to a user who do not add the blog', function() {
      cy.contains('logout').click()
      cy.auxUser({ username: 'test2', name: 'test2', password: 'pwtest2' })
      cy.login({ username: 'test2', password: 'pwtest2' })
      cy.createAuxBlog()
      cy.contains('logout').click()

      cy.login({ username: 'test', password: 'pwtest' })
      cy.contains('view').click()
      cy.contains('#remove-blog').should('not.exist')
    })

    it('blogs are ordered by likes', function() {
      cy.createManyBlogs()
      cy.get('.blog-details').eq(0).should('contain', 'this blog has 15 likes')
      cy.get('.blog-details').eq(1).should('contain', 'this blog has 10 likes')
      cy.get('.blog-details').eq(2).should('contain', 'this blog has 5 likes')

    })
  })
})