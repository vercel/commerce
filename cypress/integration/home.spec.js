describe('Home Page', () => {
  it('displays all 4 products on the home page', () => {
    cy.visit('http://localhost:3000')
    cy.getBySel('product-tag')
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Web Developer Shirt')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Senor Developer Shirt')
        cy.getBySel('product-price').should('contain', '$30.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'SQL Shirt')
        cy.getBySel('product-price').should('contain', '$20.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(3)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Developer Shirt')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})
