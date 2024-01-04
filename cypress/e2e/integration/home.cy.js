describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3000');
    cy.get('[name="search"]').type('{enter}');
    cy.get('[data-test="product-tag"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Lego Star Wars');
        cy.get('[data-test="product-price"]').should('contain', '$7.00');
      });

    cy.get('[data-test="product-tag"]')
      .eq(1)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Tatyana');
        cy.get('[data-test="product-price"]').should('contain', '$6.00');
      });

    cy.get('[data-test="product-tag"]')
      .eq(2)
      .within(() => {
        cy.get('[data-test="product-name"]').should('contain', 'Star Wars');
        cy.get('[data-test="product-price"]').should('contain', '$5.00');
      });
  });
});
