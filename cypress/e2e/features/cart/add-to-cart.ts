import { Given, When, Then } from '@badeball/cypress-cucumber-preprocessor';
import { toSlug, verifyRequest } from 'cypress/utils/url';

Given(
  'the {string} is out of stock',

  (productName: string) => {
    // Charger la fixture
    cy.fixture('product-query.json').then((query) => {
      // Insérer le nom du produit dans la requête
      query.variables.productName = productName; // Nom du produit à interroger

      // Faire la requête GraphQL
      cy.request({
        method: 'POST',
        url: 'testify-automation.myshopify.com/api/2024-07/graphql', // URL complète de l'API GraphQL de Shopify
        body: query,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '8bc822f670ae4977b83b0975fa80054b' // Token d'accès
        },
        failOnStatusCode: false // Empêche Cypress d'échouer automatiquement
      }).then((response) => {
        // Afficher la réponse dans la console pour le débogage
        console.log('response : ', response);

        // Vérifier le statut de la réponse
        expect(response.status).to.eq(200);

        // Vérifier si le produit existe dans la réponse
        const product = response.body.data?.products?.edges[0]?.node;
        expect(product).to.exist;

        // Assertion pour le nom du produit
        expect(product).to.have.property('title');
        expect(product.title).to.equal(productName);
        // Assertion du stock du produit
        expect(product).to.have.property('totalInventory');
        expect(product.totalInventory).to.equal(0);
      });
    });
  }
);

When('I select {string} color of {string}', (expectedColor: string, productName: string) => {
  const slugifiedProductName = toSlug(productName);
  // Intercepter les requêtes pour sélectionner une variante et changer la couleur
  cy.intercept('GET', `/product\/${slugifiedProductName}\?color=*`).as('getColorVariant');
  // cy.intercept('POST', `/product\/${slugifiedProductName}`).as('selectColorVariant');

  // Vérifier l'état du bouton "Add to Cart" avant la sélection de la couleur
  cy.getBySel('add-to-cart').should('exist').and('be.visible').and('be.disabled');

  // Vérifie la couleur attendue et sélectionne-la
  cy.getBySel(`Color-${expectedColor}`)
    .should('exist')
    .and('be.visible')
    .and('be.enabled')
    .invoke('text')
    .should('equal', `${expectedColor}`);

  cy.getBySel(`Color-${expectedColor}`).click();

  // Vérifie les requêtes après sélection de la couleur
  // verifyRequest('@postProduct');
  verifyRequest('@getColorVariant');
  // verifyRequest('@selectColorVariant');
});

When(
  'the {string} costs {string} {string}',
  (productName: string, amount: string, currencyCode: string) => {
    // Charger la fixture
    cy.fixture('product-query.json').then((query) => {
      // Insérer le nom du produit dans la requête
      query.variables.productName = productName; // Nom du produit à interroger

      // Faire la requête GraphQL
      cy.request({
        method: 'POST',
        url: 'testify-automation.myshopify.com/api/2024-07/graphql', // URL complète de l'API GraphQL de Shopify
        body: query,
        headers: {
          'Content-Type': 'application/json',
          'X-Shopify-Storefront-Access-Token': '8bc822f670ae4977b83b0975fa80054b' // Token d'accès
        },
        failOnStatusCode: false // Empêche Cypress d'échouer automatiquement
      }).then((response) => {
        // Afficher la réponse dans la console pour le débogage
        console.log('response : ', response);

        // Vérifier le statut de la réponse
        expect(response.status).to.eq(200);

        // Vérifier si le produit existe dans la réponse
        const product = response.body.data?.products?.edges[0]?.node;
        expect(product).to.exist;

        // Assertion pour le nom du produit
        expect(product).to.have.property('title');
        expect(product.title).to.equal(productName);

        // Vérifier si les variantes existent
        const variant = product.variants?.edges[0]?.node;
        expect(variant).to.exist;

        // Vérifier les informations sur le prix
        const price = variant.price;
        expect(price).to.have.property('amount');
        expect(price.amount).to.equal(amount.replace(',', '.'));
        expect(price).to.have.property('currencyCode');
        expect(price.currencyCode).to.equal(currencyCode);

        // Logs supplémentaires pour vérifier les variantes et les prix
        product.variants.edges.forEach((variant: any) => {
          cy.log(`Variant: ${variant.node.title}`);
          cy.log(`Price: ${variant.node.price.amount} ${variant.node.price.currencyCode}`);
        });
      });
    });
  }
);

When('I click {string}', (buttonName: string) => {
  // cy.intercept('POST', '/product/*').as('createNewCart');
  const slugifiedButtonName = toSlug(buttonName);
  // Vérifie l'existence et l'état du bouton
  cy.getBySel(slugifiedButtonName).should('exist').and('be.visible');

  // Vérifie que le cookie `cartId` est bien présent et défini

  // cy.wait('@postProduct');
  // cy.wait('@createNewCart');
  cy.getCookie('cartId').should('exist').its('value').should('not.be.undefined');

  // Clique sur le bouton
  cy.getBySel(slugifiedButtonName).click({ force: true });
});

When('I do not select a color', () => {
  cy.get('[data-test^="Color-"]').should('exist').and('be.visible');
});

When('I select {string} quantities', (quantity: string) => {
  cy.getBySel('cart-quantity-plus-button').click();
  Array.from({ length: parseInt(quantity) }).forEach(() => {});
});

Then(
  'the cart should contain {string} items of {string}',
  (quantity: string, productName: string) => {
    cy.getBySel('cart-product-container')
      .invoke('text')
      .then((productProperty) => {
        expect(productProperty).contains(productName);
      });
    // Vérifier que la quantité affichée correspond à la quantité sélectionnée
    cy.getBySel('cart-product-quantity').should('have.text', quantity);
  }
);

Then('the product should be added to my shopping cart', () => {
  // Vérifie que le panier contient bien le produit
  cy.getBySel('cart-open-button').invoke('text').should('equal', '1');
  cy.getBySel('cart-item').should('have.length', 1);
});

Then(
  'the total in the shopping cart should be updated to {string} {string}',
  (amount: string, codeCurrency: string) => {
    cy.get('[data-test="cart-side-container"] [data-test="price-amount"]')
      .should('exist')
      .and('be.visible')
      .invoke('text')
      .then((text) => {
        // Vérifier que le texte contient la devise
        expect(text).to.include(codeCurrency);
      });
    cy.getAmount(
      '[data-test="payment-information"] > :nth-child(3) > [data-test="price-amount"]',
      amount
    );
  }
);

Then('the product should not be added to my shopping cart', () => {
  cy.getBySel('cart-open-button').click();
  cy.getBySel('cart-item').should('not.exist');
  cy.getBySel('cart-empty')
    .should('exist')
    .and('be.visible')
    .invoke('text')
    .then((label) => {
      expect(label).to.be.equal('Your cart is empty.');
    });
  cy.getBySel('cart-close-button').click();
});

Then('I Can not add the product in the shopping cart', () => {
  cy.getBySel('add-to-cart').should('exist').and('be.visible').and('be.disabled');
});
Then('"Add to Cart" button should have the name "Out Of Stock"', () => {
  cy.getBySel('add-to-cart')
    .should('exist')
    .invoke('text')
    .then((label) => {
      expect(label).to.equals('Out Of Stock');
    });
});
