describe('Shopping Cart', () => {
  it('users can add products to the cart', () => {
    cy.visit('/')
    cy.getBySel('product-tag').eq(0).click()
    cy.getByAriaLabel('Add to Cart').click()
    cy.getByAriaLabel('Cart items: 1').last().contains('1')
  })
})
