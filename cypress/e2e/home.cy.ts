describe("Home Page", () => {
  it("displays all 3 products on the home page", () => {
    cy.visit("/")
    cy.getBySel("product-tag")
      .eq(0)
      .within(() => {
        cy.getBySel("product-name").should("contain", "Code Shirt")
        cy.getBySel("product-price").should("contain", "₱2,000.00")
      })
    cy.getBySel("product-tag")
      .eq(1)
      .within(() => {
        cy.getBySel("product-name").should("contain", "Funny it works on my machine programmer")
        cy.getBySel("product-price").should("contain", "₱1,000.00")
      })  
    cy.getBySel("product-tag")
      .eq(2)
      .within(() => {
        cy.getBySel("product-name").should("contain", "I'm not a robot Classic T-Shirt")
        cy.getBySel("product-price").should("contain", "₱1,000.00")
      })    

  })

})
