describe('Header', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('links to the correct pages', () => {
    cy.getBySel('logo').click();
    cy.location('pathname').should('eq', '/');

    cy.getBySel('nav-link-search').click();
    cy.location('pathname').should('eq', '/search');

    cy.getBySel('nav-link-home-page').click({ multiple: true });
    cy.location('pathname').should('eq', '/search/featured');
  });

  it.only('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').eq(0).type('Linux{Enter}');

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Linux Shirt');
        cy.getBySel('product-price').should('contain', '$35.00 USD');
      });
  });
});
