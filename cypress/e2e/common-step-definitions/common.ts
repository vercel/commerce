import { Given } from '@badeball/cypress-cucumber-preprocessor';
import { toSlug, verifyRequest } from 'cypress/utils/url';

Given('I am on the product detail page for {string}', (productName: string) => {
  const slugifiedProductName = toSlug(productName);
  cy.intercept('GET', `/product/${slugifiedProductName}`).as('getProduct');
  cy.intercept('POST', '/product/*').as('postProduct');

  // Visite de la page produit
  cy.visit(`/product/${slugifiedProductName}`);

  // Femrer la notification de NextJs
  cy.get('body > main > section')
    .find('button')
    .should('exist')
    .and('be.visible')
    .and('not.be.disabled')
    .trigger('click');

  // Vérifie la réponse du produit
  verifyRequest('@getProduct');
  verifyRequest('@postProduct');
});
