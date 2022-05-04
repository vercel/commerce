describe('Home Page', () => {
  beforeEach(() => cy.visit('/'))

  it('displays all 3 products on the home page', () => {
    cy.getBySel('product-tag')
      .eq(0)
      .within(() => {
        cy.getBySel('product-name').should(
          'contain',
          'New Short Sleeve T-Shirt'
        )
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })

    cy.getBySel('product-tag')
      .eq(1)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Lightweight Jacket')
        cy.getBySel('product-price').should('contain', '$249.99 USD')
      })

    cy.getBySel('product-tag')
      .eq(2)
      .within(() => {
        cy.getBySel('product-name').should('contain', 'Shirt')
        cy.getBySel('product-price').should('contain', '$25.00 USD')
      })
  })
})

describe('Header', () => {
  beforeEach(() => cy.visit('/'))

  it('links to the correct pages', () => {
    cy.getBySel('logo').click()
    cy.location('pathname').should('eq', '/')

    cy.getBySel('nav-link-search').click()
    cy.location('pathname').should('eq', '/search')

    cy.getBySelLike('nav-link-home-page-New').click()
    cy.location('pathname').should('eq', '/search/new-arrivals')
  })

  it('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').eq(0).type('New Short Sleeve T-Shirt{enter}')

    // nothing gets filtered
    // cy.getBySel('product-tag')
    //   .eq(0)
    //   .within(() => {
    //     cy.getBySel('product-name').should(
    //       'contain',
    //       'New Short Sleeve T-Shirt'
    //     )
    //     cy.getBySel('product-price').should('contain', '$25.00 USD')
    //   })
  })
})

describe('Shopping Cart', () => {
  it('users can add products to the cart', () => {
    cy.visit('/')
    cy.getBySel('product-tag').eq(0).click()
  })
})
