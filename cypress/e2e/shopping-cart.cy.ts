describe('Shopping Cart', () => {
  it('users can add products to the cart', () => {
    cy.visit('/');

    cy.getBySel('product-label').eq(0).click();
    cy.location('pathname').should('include', '/product/');
    cy.get('[aria-label="Add item to cart"]').click();
  });
});
