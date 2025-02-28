import React from 'react'
import HomePage from './page'

describe('<HomePage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<HomePage />)
  })
})