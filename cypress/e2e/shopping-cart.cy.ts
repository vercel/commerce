describe("Shopping Cart", () => {
    it("users can add products to the cart", () => {
      cy.visit("/")
      cy.getBySel("product-tag").eq(0).click()
      cy.get('[aria-label="Add to cart"]').click()
      cy.get('[aria-label="Cart items: 1"]').contains("1")
    })

  })
  