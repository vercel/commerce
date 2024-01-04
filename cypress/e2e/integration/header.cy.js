describe('Shopping Cart', () => {
  beforeEach(() => {
    cy.visit('/');
  });
  it('users can add products to the cart', () => {
    cy.get('[name="search"]').type('{enter}');
    cy.getBySel('product-tag').eq(0).click();
    cy.getBySel('Rubber').eq(0).click();
    cy.get('[aria-label="Add to cart"]').click();
    cy.get('[aria-label="Cart items:"]').contains('1');
  });
  it('links to the correct pages', () => {
    cy.getBySel('logo').click({ multiple: true });
    cy.location('pathname').should('eq', '/');
    cy.getBySel('nav-link-home-page').click();
    cy.location('pathname').should('eq', '/');
  });
  it.only('the search bar returns the correct search results', () => {
    cy.get('[name="search"]').type('{enter}');
    cy.location('pathname').should('eq', '/search');
    cy.getBySel('search-input').eq(0);
  });
});
