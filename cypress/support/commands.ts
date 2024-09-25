import { destructPrice, omitSubstrings as getFloat } from '../utils/price';

declare global {
  namespace Cypress {
    interface Chainable {
      //   login(email: string, password: string): Chainable<void>
      //   drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
      //   visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
      getBySel(
        selector: string,
        ...args: Partial<
          Cypress.Loggable & Cypress.Timeoutable & Cypress.Withinable & Cypress.Shadow
        >[]
      ): Chainable<JQuery<HTMLElement>>;

      verifyProductPrice(
        selector: string,
        expectedCurrencySymbol: string,
        expectedPrice: string,
        expectedCurrencyCode: string
      ): Chainable<void>;

      getAmount(selector: string, priceExpected: string, ...substrings: string[]): Chainable<void>;
    }
  }
}

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test="${selector}"]`, ...args);
});

Cypress.Commands.add(
  'verifyProductPrice',
  (
    selector: string,
    expectedCurrencySymbol: string,
    expectedPrice: string,
    expectedCurrencyCode: string
  ) => {
    cy.get(selector)
      .should('be.visible')
      .invoke('text')
      .then((amount) => {
        const { currencySymbol, price, currencyCode } = destructPrice(amount);
        expect(currencySymbol).to.equal(expectedCurrencySymbol);
        expect(price).to.equal(expectedPrice.toString());
        expect(currencyCode).to.equal(expectedCurrencyCode);
      });
  }
);

Cypress.Commands.add('getAmount', (selector: string, amountExpected: string) => {
  cy.get(selector)
    .should('exist')
    .and('be.visible')
    .invoke('text')
    .then((text) => {
      const amount = text.replace(/[^\d,\.]/g, '');
      expect(amount).to.be.equal(amountExpected);
    });
});
