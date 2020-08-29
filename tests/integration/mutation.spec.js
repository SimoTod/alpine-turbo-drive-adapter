/* global describe, it, cy */

describe('mutation observer', () => {
  it('works correctly when used with turbolinks', () => {
    cy.visit('/tests/res/mutation/index.html')

    // Add new Alpine component
    cy.get('button').click()

    // Check component is added correctly
    cy.get('#container').find('p').should('have.length', 1)
    // Check component is initialised correctly
    cy.get('#container').find('span').should('have.length', 1)
  })
})
