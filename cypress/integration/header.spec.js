describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('links to the correct page', () => {
    cy.getBySel('logo').click()
    cy.location('pathname').should('eq', '/')

    cy.getBySel('nav-link-search').click()
    cy.location('pathname').should('eq', '/search')

    cy.getBySel('nav-link-home-page').click()
    cy.location('pathname').should('eq', '/search/frontpage')
  })

  // I don't think this test does what the tutorial wanted it to do
  // it does not wait for the page to load before testing the result
  it.only('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').eq(0).type('sql{enter}')

    cy.getBySel('product-tag').within(() => {
      cy.getBySel('product-name').should('contain', 'SQL Shirt')
      cy.getBySel('product-price').should('contain', '$20.00 USD')
    })
  })
})
