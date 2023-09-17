/* global describe, it, cy, expect */

describe('x-teleport directives', () => {
  it('should not add a duplicate item when navigating away and back to the page multiple times', () => {
    cy.visit('/tests/res/turbo/teleport/index.html')

    // Check component works correctly
    cy.get('p').should('have.length', 1)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/index.html')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/index.html')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/teleport/index.html')

    // test
    cy.get('p').should('have.length', 1)
    cy.window().then((win) => {
      expect(win.console.error).not.to.be.called // eslint-disable-line no-unused-expressions
    })
  })
})
