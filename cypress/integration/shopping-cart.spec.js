describe('Shopping Cart', () => {
  it('users can add products to cart', () => {
    cy.visit('/');
    cy.getBySel('product-tag').eq(0).click();
    cy.get('[aria-label="Add to Cart"]').click();
  });
});
