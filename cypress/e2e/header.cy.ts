import { DATA_TEST_SELECTORS } from 'cypress/utils/constants';

describe('Header Tests', () => {
  beforeEach(() => {
    cy.visit('/');
    // Femrer la notification de NextJs
    cy.get('body > main > section')
      .find('button')
      .should('exist')
      .and('be.visible')
      .and('not.be.disabled')
      .trigger('click');
  });
  it('should display the correct grid items', () => {
    cy.visit('/');
    cy.getBySel('navbar').should('be.visible');
    cy.getBySel('navbar-logo').should('be.visible');
    cy.getBySel('navbar-logo').should('have.attr', 'href', '/');
    cy.getBySel('navbar-logo').click();
    cy.location('pathname').should('eq', '/');

    cy.getBySel('search-input').click().type('{enter}');
    cy.location('pathname').should('eq', '/search');

    cy.getBySel('search-filter-item').each((item: JQuery<HTMLElement>) => {
      const text = item.text();
      if (text === 'Hydrogen') {
        cy.wrap(item).click();
      }
    });
    cy.location('pathname').should('eq', '/search/hydrogen');
  });

  it('users can add products to the cart with quantity eq 1 and another product with quantity eq 2', () => {
    /*
    Aller vers le premier produit que nous allons ajouter au panier
    Vérifier que nous atterisson sur le bon chemin du produit
    Vérifier qu'on récupére bien les élements suivants :
    - Image
    - Titre
    - Description
    */

    cy.get(DATA_TEST_SELECTORS.productCarouselSection.items(2).product.link).click();
    cy.location('pathname').should('eq', '/product/the-inventory-not-tracked-snowboard');
    cy.getBySel('product-page').should('exist');
    cy.getBySel('product-details').should('exist');
    cy.getBySel('product-details').within(() => {
      cy.getBySel('product-image').should('exist');
    });
    cy.getBySel('product-description').should('exist');
    cy.getBySel('product-title')
      .invoke('text')
      .then((title: string) => {
        expect(title).to.equal('The Inventory Not Tracked Snowboard');
      });
    /*
  Préparer l'interception de l'appel au serveur  afin d'être sûr que l'action est fini avant denclencher une nouvelle
  - Nous allons jouer le scénario suivant :
  1. Nous allons prendre un seul premier produit et le mettre au panier et vérifier qu'il a :
  - Une image
  - Un nom produit
  - Un prix avec devise
  - Quantité attendu
  2. Nous allons prendre un deuxième produit en double et vérifier les mêmes informations que le premier produit.
*/
    cy.intercept('POST', '/product/the-inventory-not-tracked-snowboard').as('addItemToCart'); // Associer une requête réseau
    cy.getBySel('submit-button').should('exist').invoke('text').should('equal', 'Add To Cart');
    cy.wait(500);
    cy.getBySel('submit-button').click(); // J'actionne l'ajout au panier'
    cy.wait('@addItemToCart'); // Attendre que la requête réseau soit terminée
    cy.get('[id^="headlessui-dialog-panel"]').should('exist').and('be.visible'); // Vérifier que la model est présente

    // Vérification du produit
    cy.getBySel('cart-item').should('exist').and('have.length', 1); // Vérifier qu'on un seul produit dans le panier'
    cy.getBySel('cart-product-quantity').eq(0).invoke('text').should('equal', '1'); // Vérifier qu'on a pris un seul (quantité) produit'

    /* Vérification de l'image qu'elle
      - Existe
      - Visible
      - est chargée
     - Défini pour l'accessibilité

    */
    cy.getBySel('cart-product-image')
      .should('exist') // Vérifie que l'élément existe
      .and('be.visible') // Vérifie que l'élément est visible
      .then(($img) => {
        // Vérifier que l'élément est bien une image
        const img = $img[0] as HTMLImageElement;

        // Utiliser 'expect' pour vérifier les propriétés de l'image
        expect(img).to.have.property('naturalWidth').that.is.greaterThan(0); // Vérifier la largeur naturelle
        expect(img).to.have.property('naturalHeight').that.is.greaterThan(0); // Vérifier la hauteur naturelle
        expect(img).to.have.property('width').that.is.greaterThan(0); // Vérifier la largeur naturelle
        expect(img).to.have.property('height').that.is.greaterThan(0); // Vérifier la hauteur naturelle
        expect(img.src).to.not.be.empty; // Vérifier que l'URL de l'image n'est pas vide
        expect(img.alt).to.not.be.empty; // Vérifier que l'attribut alt n'est pas vide
      });
    // Fermer la modal et vérifier qu'il y a 5 images'
    cy.getBySel('cart-close-button').click(); // Fermer la modal pour pouvoir séléctionner les produits en dehors
    cy.getBySel('product-related').within((product) => {
      // Séléctionner la section aux produits liés
      cy.wrap(product).find('h2').invoke('text').should('equal', 'Related Products'); // Vérifier le titre des produits présentés
      cy.getBySel('product-item').should('have.length', 5);
      cy.getBySel('tile-image')
        .should('exist')
        .and('be.visible')
        .then(($img) => {
          const img = $img[0] as HTMLImageElement;

          // Utiliser 'expect' pour vérifier les propriétés de l'image
          expect(img).to.have.property('naturalWidth').that.is.greaterThan(0); // Vérifier la largeur naturelle
          expect(img).to.have.property('naturalHeight').that.is.greaterThan(0); // Vérifier la hauteur naturelle
          expect(img).to.have.property('width').that.is.greaterThan(0); // Vérifier la largeur naturelle
          expect(img).to.have.property('height').that.is.greaterThan(0); // Vérifier la hauteur naturelle
          expect(img.src).to.not.be.empty; // Vérifier que l'URL de l'image n'est pas vide
          expect(img.alt).to.not.be.empty; // Vérifier que l'attribut alt n'est pas vide
        });
    });
    cy.getBySel('product-item-link').eq(2).click();

    cy.intercept('POST', '/product/the-collection-snowboard-oxygen').as('addItem2ToCart'); // Associer une requête réseau
    cy.getBySel('submit-button').should('exist').invoke('text').should('equal', 'Add To Cart');
    cy.wait(100);
    cy.getBySel('submit-button').click(); // J'actionne l'ajout au panier'
    cy.wait('@addItem2ToCart'); // Attendre que la requête réseau soit terminée
    cy.getBySel('cart-side-container').should('exist').and('be.visible'); // Vérifier que la model est présente

    // Vérification du produit
    cy.getBySel('cart-item').should('exist').and('have.length', 2); // Vérifier qu'on un seul produit dans le panier'

    // cy.getBySel('cart-quantity-plus-button').eq(1).click().click(); // Augmenter la quantité de 2
    cy.getBySel('cart-quantity-plus-button').eq(1).click().click();

    cy.getBySel('cart-product-quantity')
      .should('exist')
      .and('be.visible')
      .eq(1)
      .invoke('text')
      .should('equal', '3'); // Vérifier qu'on a une quantité de 3'

    cy.getBySel('cart-quantity-minus-button').eq(1).click(); // Diminier la quantité de 1
    cy.getBySel('cart-product-quantity')
      .should('exist')
      .and('be.visible')
      .eq(1)
      .invoke('text')
      .should('equal', '2'); // Vérifier qu'on a une quantité de 2'

    // Vérifier le montant total avec le checkout
    cy.getAmount(
      '[data-test="payment-information"] > :nth-child(3) > [data-test="price-amount"]',
      '2 924,90',
      '€',
      'EUR'
    );

    cy.getBySel('checkout-button').click();
    cy.origin('https://testify-automation.myshopify.com/password', () => {
      cy.url().should('equal', 'https://testify-automation.myshopify.com/password');
      cy.get('#password').type('skifro');
      // cy.get('button').click();
    });
  });

  it.only('Vérifier les cookies', () => {
    cy.getAllCookies().then((cookies) => {
      if (cookies.length > 0) {
        cookies.forEach((cookie) => {
          cy.log(`Nom du cookie : ${cookie.name}`);
          cy.log(`Valeur du cookie : ${cookie.value}`);
          console.log(`Nom du cookie : ${cookie.name}`);
          console.log(`Valeur du cookie : ${cookie.value}`);
        });
        // Tu peux accéder à ses propriétés comme `cookie.name`, `cookie.value`, etc.}
      } else {
        cy.log('Pas de cookie trouvés');
      }
    });
  });
});
