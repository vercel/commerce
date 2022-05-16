describe("Home Page", () => {
    it("displays all 3 products on the home page", () =>{
        cy.visit("/")
        cy.get('[data-test="product-tag"]')
            .eq(0)
            .within(() => {
                cy.get('[data-test="product-name"]').should("contain", "Pink Dress")
                cy.get('[data-test="product-price"]').should("contain", "$100.00 AUD")
        })

        cy.get('[data-test="product-tag"]')
        .eq(1)
        .within(() => {
            cy.get('[data-test="product-name"]').should("contain", "Purple dress")
            cy.get('[data-test="product-price"]').should("contain", "$95.00 AUD")
        })
    })
})