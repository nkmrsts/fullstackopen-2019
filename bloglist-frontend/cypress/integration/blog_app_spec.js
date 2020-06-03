describe('Blog ', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Taro',
      username: 'testtesttest',
      password: '12345678',
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function () {
    cy.contains('Log in to application')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('testtesttest')
      cy.get('input[name="password"]').type('12345678')
      cy.contains('login').click()
    })

    it('name of the user is shown', function () {
      cy.contains('Test Taro logged in')
    })

    it('a new blog can be created', function () {
      const blogTitle = 'cypress blog'
      const blogAuthor = 'cypress'
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(5000)

      cy.contains('new blog').click()
      cy.get('input[name="title"]').type(blogTitle)
      cy.get('input[name="author"]').type(blogAuthor)
      cy.get('input[name="url"]').type('https://www.cypress.io/')
      cy.contains('create').click()
      cy.contains(`a new blog ${blogTitle} by ${blogAuthor} added`)
      cy.get('table').contains(blogTitle)
    })

    describe('and a blog is created', function () {
      const blogTitle = 'another blog'
      const blogAuthor = 'cypress'
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('input[name="title"]').type(blogTitle)
        cy.get('input[name="author"]').type(blogAuthor)
        cy.get('input[name="url"]').type('https://www.cypress.io/')
        cy.contains('create').click()
      })
      it('it can be made liked', function () {
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.wait(5000)
        cy.get('table').contains(blogTitle).click()
        cy.contains('like').click()
      })
    })
  })
})
