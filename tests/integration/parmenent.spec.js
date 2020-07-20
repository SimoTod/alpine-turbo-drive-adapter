/* global describe, it, cy */

describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://127.0.0.1:8080/tests/res/permanent/index.html')

    // Update foo
    cy.get('span').contains(/^bar$/)
    cy.get('input').type('2')
    cy.get('span').contains(/^bar2$/)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://127.0.0.1:8080/tests/res/permanent/target.html')

    // foo should preserve the value from the previous component
    cy.get('span').contains(/^bar2$/)

    // Alpine component should still be working
    cy.get('button').click()
    cy.get('span').contains(/^baz$/)
  })
})
