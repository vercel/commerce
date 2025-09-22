describe("Header", () => {
    beforeEach(() => {
      cy.visit("/")
    })
    
    it("links to the correct pages", () => {
      cy.getBySel("logo").click()
      cy.location("pathname").should("eq", "/")

      cy.getBySel("search-input").type("{enter}")
      cy.location("pathname").should("eq", "/search")

      cy.getBySel("nav-link-home-page").click()
      cy.location("pathname").should("eq", "/")
    })
    
    it.only('the search bar returns the correct search results', () => {
      cy.getBySel('search-input').eq(0).type("Funny {enter}")
      cy.getBySel('product-tag').eq(0).should("contain", "Funny it works on my machine")
      cy.getBySel('product-price').eq(0).should("contain", "₱1,000.00")
    })
  })
  