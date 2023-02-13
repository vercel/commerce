describe('Header', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it.only('the search bar returns the correct search results', () => {
    cy.getBySel('search-input').eq(0).type('navy{enter}')
    cy.get('.animated.fadeIn').contains('Showing 2 results for "navy"')

    // search by Price: Low to high
    cy.visit('/search?q=navy&sort=price-asc')
    cy.getBySel('productPrice').eq(0).contains('2,500.00')

    // search by Price: High to low
    cy.visit('/search?q=navy&sort=price-desc')
    cy.getBySel('productPrice').eq(0).contains('7,000.00')
  })
})
