declare namespace Cypress {
  interface Chainable {
    getBySel(selector, ...args): Cypress.Chainable;
  }
}
