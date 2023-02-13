describe('User Sign-up and Login', function () {
  beforeEach(function () {
    cy.intercept('POST', '/api/2022-07/graphql.json').as('signup')
  })

  it('should allow a visitor to sign-up,login and logout', function () {
    const userInfo = {
      firstName: 'Ashar',
      lastName: 'Ali',
      email: 'Ashar' + Math.random() + '@gmail.com',
      password: 's3cret',
    }

    // Sign-up User
    cy.visit('/')

    cy.getBySel('avatarButton').should('be.visible').click()
    cy.getBySel('loginModal').should('be.visible').and('contain', 'Sign Up')
    cy.getBySel('signup').click()
    cy.getBySel('signupModal').should('be.visible').and('contain', 'Log In')
    cy.getBySel('signupModal').within(($form) => {
      cy.getBySel('signup-first-name')
        .click()
        .type(userInfo.firstName)
        .should('have.value', userInfo.firstName)
      cy.getBySel('signup-last-name')
        .click()
        .type(userInfo.lastName)
        .should('have.value', userInfo.lastName)
      cy.getBySel('signup-email')
        .click()
        .type(userInfo.email)
        .should('have.value', userInfo.email)
      cy.getBySel('signup-password')
        .type(userInfo.password)
        .should('have.value', userInfo.password)
      cy.getBySel('signup-submit').click()
      cy.wait('@signup')
    })
    cy.getBySel('signupModal').should('not.exist')

    // Login User
    cy.getBySel('avatarButton').click()
    cy.getBySel('signupModal').should('be.visible').and('contain', 'Log In')
    cy.getBySel('LogIn').click()
    cy.getBySel('loginModal')
      .should('be.visible')
      .and('contain', 'Sign Up')
      .within(($form) => {
        cy.getBySel('signin-email')
          .click()
          .type(userInfo.email)
          .should('have.value', userInfo.email)
        cy.getBySel('signin-password')
          .type(userInfo.password)
          .should('have.value', userInfo.password)
        cy.getBySel('signin-submit').click()
        cy.wait('@signup')
      })

    // logout user
    cy.getBySel('avatarButton').click()
    cy.getBySel('logoutButton').should('be.visible').click()
    cy.getBySel('logoutButton').should('not.exist')
  })
})
