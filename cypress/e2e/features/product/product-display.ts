import { When, Then } from '@badeball/cypress-cucumber-preprocessor';

// Étape pour attendre le chargement de la page
When('the page loads', () => {
  cy.get('main').should('exist').and('be.visible'); // Attend 2 secondes pour que la page soit complètement chargée
});

// Étape pour vérifier que la liste des produits est visible
Then('I should see a list of products', () => {
  cy.getBySel('product-link').should('exist').and('be.visible'); // Vérifie que la liste des produits est visible
});

// Étape pour vérifier que chaque produit a une image
Then('each product should have an image', () => {
  cy.getBySel('tile-image').each(($el) => {
    cy.wrap($el).should('have.attr', 'src').and('not.be.empty'); // Vérifie que chaque produit a une image
  });
});

// Étape pour vérifier que chaque produit a un nom
Then('each product should have a name', () => {
  cy.getBySel('label-title-text').each(($el) => {
    cy.wrap($el).should('not.be.empty'); // Vérifie que chaque produit a un nom
  });
});

// Étape pour vérifier que chaque produit a un prix
Then('each product should have a price', () => {
  cy.getBySel('price-amount').each(($el) => {
    cy.wrap($el).should('not.be.empty'); // Vérifie que chaque produit a un prix
  });
});

// Étape pour vérifier que le prix est au format EUR avec deux décimales
Then('the price should be displayed in EUR with two decimal points', () => {
  cy.getBySel('price-amount').each(($el) => {
    cy.wrap($el)
      .invoke('text')
      .should('match', /^[€$£]?(\d{1,3}(,\d{3})*|\d+)\.\d{2}[A-Z]{3}$/); // Vérifie le format EUR avec deux décimales
  });
});
