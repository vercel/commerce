describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('links to the correct pages', () => {
    cy.getBySel('logo').click()
    cy.location('pathname').should('eq', '/')

    cy.getBySel('nav-link-search').click()
    cy.location('pathname').should('eq', '/search')

    cy.getBySel('nav-link-home-page').click()
    cy.location('pathname').should('eq', '/search/frontpage')
  })

  it('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').eq(0).type('poke{enter}')

    cy.get('[data-test="product-tag"]').within(() => {
      cy.get('[data-test="product-name"]').should('contain', 'Poke Ball')
      cy.get('[data-test="product-price"]').should('contain', '$9.99 USD')
    })
  })
})
