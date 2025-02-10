
declare namespace Cypress {
    interface Chainable {
        getBySel(selector: string): Chainable<JQuery<HTMLElement>>
    }
}