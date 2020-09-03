/* global describe, it, cy */

describe('x-cloak directives', () => {
  it('should tag x-cloak items on first page load', () => {
    cy.visit('/tests/res/cloak/index.html')

    // Check element was tagged
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked')
  })

  it('should tag x-cloak items when navigating with turbolinks', () => {
    cy.visit('/tests/res/cloak/index.html')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/cloak/target.html')

    // Check element was tagged
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked')
  })
})
