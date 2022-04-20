describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('links to the correct pages', () => {
    cy.getBySel('logo').click()
    cy.location('pathname').should('eq', '/')

    cy.getBySel('nav-link-search').click()
    cy.location('pathname').should('eq', '/search')

    cy.getBySel('nav-link-home-page').click({ multiple: true })
    cy.location('pathname').should('eq', '/search/featured')
  })

  it('the search bar returns the correct search results', () => {})
})
