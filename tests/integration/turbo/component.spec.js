/* global describe, it, cy, expect */

describe('component', () => {
  it('should not break if x-data is retrieved from an external js loaded on the second page', () => {
    cy.visit('/tests/res/turbo/component/index.html')

    // Check Alpine started correctly
    cy.get('span').contains(/^bar$/)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbo/component/target.html')

    // test
    cy.get('span').contains(/^baz$/)
    cy.window().then((win) => {
      expect(win.console.error).not.to.be.called // eslint-disable-line no-unused-expressions
    })
  })
})
