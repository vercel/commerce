/// <reference types="cypress" />
/// <reference types="../support" />

describe("Testing for header elements", () => {
    it("return the right product when searched", () => {
        cy.visit("http://localhost:3000");
        cy.getBySel("search-bar-input").type("camisa{enter}");
        cy.getBySel("product-link").first().click();
        cy.location("pathname").should("eq", "/product/otra-camisa");
    })
})