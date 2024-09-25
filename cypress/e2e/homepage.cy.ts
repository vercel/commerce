import { DATA_TEST_SELECTORS } from 'cypress/utils/constants';

describe('Three Item Grid Tests', () => {
  beforeEach(() => {
    // Visiting the home page
    cy.visit('/');
  });
  // List all selector that will be used for the home page
  const threeGridItem = () => cy.get(DATA_TEST_SELECTORS.productGridSection.items().container);

  const fullSizeGridItem = () =>
    cy.get(DATA_TEST_SELECTORS.productGridSection.items('full', 0).container);

  // First test case: checks if the grid displays the correct items
  it('Verify all grid item', () => {
    threeGridItem().should('exist').and('be.visible').and('have.length', 3);

    // Checking if the first 'full size' grid item exists
    fullSizeGridItem().should('exist');

    // Verifying the price of the first full-size grid item (good to verify both amount and currency)
    const fullSizeGridItemPrice = DATA_TEST_SELECTORS.productGridSection.items('full', 0).product
      .price.amount;
    cy.verifyProductPrice(
      fullSizeGridItemPrice,
      '€', // Currency symbol to be checked
      '749.95', // Expected price amount
      'EUR' // Expected currency code
    );
  });

  // Second test case: checks if the user can navigate to the correct product page
  it('should navigate to the correct product page', () => {
    // Clicking the first product link in the product carousel section
    cy.get(DATA_TEST_SELECTORS.productCarouselSection.items(0).product.link).click();

    // Asserting that the correct product page is loaded by checking the URL
    cy.url().should('include', '/product/');
    cy.url().should('include', '/product/the-collection-snowboard-oxygen');
  });
});
