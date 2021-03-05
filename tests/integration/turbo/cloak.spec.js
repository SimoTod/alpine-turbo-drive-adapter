/* global describe, it, cy */

describe('x-cloak directives', () => {
  it('should tag x-cloak items on first page load', () => {
    cy.visit('/tests/res/turbo/cloak/index.html')

    // Check element was tagged
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked')
  })

  it('should tag x-cloak items when navigating with turbolinks', () => {
    cy.visit('/tests/res/turbo/cloak/index.html')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbo/cloak/target.html')

    // Check element was tagged with the right value
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked')
  })

  it('should mantain the x-cloak value', () => {
    cy.visit('/tests/res/turbo/cloakCustom/index.html')

    // Check element was tagged
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked', 'mobile')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbo/cloakCustom/target.html')

    // Check element was tagged with the right value
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked', 'mobile')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/turbo/cloakCustom/index.html')

    // Check element was tagged  with the right value from cache
    cy.get('span').should('have.attr', 'data-alpine-was-cloaked', 'mobile')
  })
})
