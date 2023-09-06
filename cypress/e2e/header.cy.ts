describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('links to the correct pages', () => {
    cy.getBySel('logo').click();
    cy.location('pathname').should('eq', '/');
  });

  it.only('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').type('liquid{enter}');

    cy.getBySel('product-label')
      .should('have.length', 1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'The Collection Snowboard: Liquid');
        cy.getBySel('product-price').should('contain', '₫750VND');
      });
  });
});
