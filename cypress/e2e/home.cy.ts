describe('Home Page', () => {
  it('displays all 3 products on the home page', () => {
    cy.visit('http://localhost:3000');

    cy.getBySel('three-items-grid').within(() => {
      cy.getBySel('product-label')
        .eq(0)
        .within(() => {
          cy.getBySel('product-name').should('contain', 'The Collection Snowboard: Liquid');
          cy.getBySel('product-price').should('contain', '₫750VND');
        });

      cy.getBySel('product-label')
        .eq(1)
        .within(() => {
          cy.getBySel('product-name').should('contain', 'The Collection Snowboard: Oxygen');
          cy.getBySel('product-price').should('contain', '₫1,025VND');
        });

      cy.getBySel('product-label')
        .eq(2)
        .within(() => {
          cy.getBySel('product-name').should('contain', 'The Collection Snowboard: Hydrogen');
          cy.getBySel('product-price').should('contain', '₫600VND');
        });
    });
  });
});
