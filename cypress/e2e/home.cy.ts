describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('/')
    cy.get('[data-test="product-tag"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Poke Ball')
        cy.get('[data-test="product-price"]').should('contain', '$9.99 USD')
      })

    cy.get('[data-test="product-tag"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Great Ball')
        cy.get('[data-test="product-price"]').should('contain', '$99.99 USD')
      })

    cy.get('[data-test="product-tag"]')
      .eq(2)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Ultra Ball')
        cy.get('[data-test="product-price"]').should('contain', '$999.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(3)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Master Ball')
        cy.get('[data-test="product-price"]').should(
          'contain',
          '$999999999.99 USD'
        )
      })
    cy.get('[data-test="product-tag"]')
      .eq(4)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Potion')
        cy.get('[data-test="product-price"]').should('contain', '$9.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(4)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Super Potion')
        cy.get('[data-test="product-price"]').should('contain', '$99.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(5)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Hyper Potion')
        cy.get('[data-test="product-price"]').should('contain', '$999.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(6)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Max Potion')
        cy.get('[data-test="product-price"]').should('contain', '$9999.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(7)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Fire Stone')
        cy.get('[data-test="product-price"]').should('contain', '$999.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(8)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Water Stone')
        cy.get('[data-test="product-price"]').should('contain', '$999.99 USD')
      })
    cy.get('[data-test="product-tag"]')
      .eq(9)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Thunder Stone')
        cy.get('[data-test="product-price"]').should('contain', '$999.99 USD')
      })
  })
})
