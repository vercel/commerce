describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it('links to the correct pages', () => {
    cy.getBySel('logo').click()
    cy.assertUrl('/')

    cy.getBySel('nav-link-search').click()
    cy.assertUrl('/search')

    cy.getBySel('nav-link-home-page').click()
    cy.assertUrl('/search/frontpage')
  })

  it.only('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').first().type('T-Rex{enter}')

    cy.getBySel('product-tag')
      .should('be.visible')
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Star Wars')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})
