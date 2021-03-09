/* global cy, Cypress */

Cypress.on('window:before:load', (win) => {
  cy.spy(win.console, 'error')
})

Cypress.on('uncaught:exception', (e, runnable) => {
  // returning false here prevents Cypress from failing tests
  return false
})
