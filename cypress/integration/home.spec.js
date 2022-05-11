describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.get('[data-test="product-tag"]')
      .first()
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'T-Rex')
        cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
      })

    cy.get('[data-test="product-tag"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'SQL')
        cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
      })

    cy.get('[data-test="product-tag"]')
      .last() // that's the way to check the amount of the elements
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Star Wars')
        cy.get('[data-test="product-price"]').should('contain', '$25.00 USD')
      })
  })
})
