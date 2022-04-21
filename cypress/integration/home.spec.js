describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('/');

    cy.getBySel('product-tag')
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Code Shirt');
        cy.getBySel('product-price').should('contain', '$25.00 USD');
      });

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Dev Sticker Pack');
        cy.getBySel('product-price').should('contain', '$30.00 USD');
      });

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Linux Shirt');
        cy.getBySel('product-price').should('contain', '$35.00 USD');
      });
  });
});
