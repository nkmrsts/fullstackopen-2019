describe('Blog ', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })

  it('login form can be opened', function () {
    cy.contains('Log in to application')
  })

  it('user can login', function () {
    cy.get('input[name="username"]').type('root')
    cy.get('input[name="password"]').type('password')
    cy.contains('login').click()
    cy.contains('logged in')
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input[name="username"]').type('root')
      cy.get('input[name="password"]').type('password')
      cy.contains('login').click()
    })

    it('name of the user is shown', function () {
      cy.contains('superuser logged in')
    })

    it('a new blog can be created', function () {
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.wait(15000)
      cy.contains('new blog').click()
      cy.get('input[name="title"]').type('cypress test')
      cy.get('input[name="author"]').type('cypress')
      cy.get('input[name="url"]').type('https://www.cypress.io/')
      cy.contains('create').click()
      cy.contains('a new blog cypress test by cypress added')
    })
  })
})
