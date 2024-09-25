import { Given } from '@badeball/cypress-cucumber-preprocessor';

// Étape pour aller à la page d'accueil

Given('I am on the homepage', () => {
  cy.visit('/');
});
