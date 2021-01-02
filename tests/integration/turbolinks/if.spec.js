/* global describe, it, cy, expect */

describe('x-if directives', () => {
  it('should not add a duplicate item when navigating away and back to the page', () => {
    cy.visit('/tests/res/turbolinks/if/index.html')

    // Check component works correctly
    cy.get('div').find('span').should('have.length', 1)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/if/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbolinks/if/index.html')

    // test
    cy.get('div').find('span').should('have.length', 1)
    cy.window().then((win) => {
      expect(win.console.error).not.to.be.called // eslint-disable-line no-unused-expressions
    })
  })
})
