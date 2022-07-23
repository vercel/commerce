describe('Home Page', () => {
  beforeEach(() => cy.visit('/'))

  it('displays all 3 products on the home page', () => {
    cy.getBySel('product-tag')
      .should('have.length.gte', 3)
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'tshirt-stack-overflow')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should(
          'contain',
          'tshirt-it-works-on-my-machine'
        )
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'tshirt-github')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})
