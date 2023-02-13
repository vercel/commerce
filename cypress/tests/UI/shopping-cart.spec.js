describe('Shopping Cart', () => {
  beforeEach(function () {
    cy.intercept('GET', '/_next/data/development/en-US/product/*').as('product')
  })

  it('users can add and remove products to the cart', () => {
    cy.visit('/')
    cy.getBySel('product-tag').eq(0).click()
    cy.getBySel('addToCart').should('be.visible').click()
    cy.getBySel('cartItems').should('be.visible').and('contain', '1')
    cy.getBySel('closeSidebar').should('be.visible').click()

    //Add another product from related products
    cy.getBySel('relatedProducts').eq(1).click()
    cy.wait(2000)
    cy.getBySel('product-tag').within(() => {
      cy.getBySel('product-name').should('be.visible')
      cy.getBySel('product-price').should('be.visible')
    })
    cy.getBySel('nextProductImage').should('be.visible').click()
    cy.getBySel('previousProductImage').should('be.visible').click()
    cy.getBySel('addToCart').should('be.visible').click()
    cy.getBySel('cartItems').should('be.visible').and('contain', '2')

    //View cart and remove item
    cy.getBySel('goToCart').click()
    cy.get('[data-test="removeItem"]:nth-child(1) button').first().click()
    cy.getBySel('cartItems').should('be.visible').and('contain', '1')
  })
})
