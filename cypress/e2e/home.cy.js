/// <reference types="cypress" />


describe('Home Page', () => {
    it("Displays all 2 products at home page", () => {
        cy.visit("http://localhost:3000")
    })
})

