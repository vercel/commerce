describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3001')
    cy.get('[data-test="product-tag"]')
  })
})
