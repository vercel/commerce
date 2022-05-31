describe("Home Page", () => {
    it("displays all 2 products on the home page", () => {
      cy.visit("http://localhost:3000")
      cy.get('[data-test="product-tag"]')
      .eq(0)
      .within(() => {
        cy.get('[data-test="product-name"]').should("contain", "Hedgehog shirt")
        cy.get('[data-test="product-price"]').should("contain", "$50.00 AUD")
      })
    })
  })
  