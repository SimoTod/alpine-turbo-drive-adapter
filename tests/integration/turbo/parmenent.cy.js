/* global describe, it, cy, expect */

describe('data-turbo-permanent elements', () => {
  it('keep the state when navigating to a new page', () => {
    cy.visit('/tests/res/turbo/permanent/index.html')

    // Update foo
    cy.get('span').contains(/^bar$/)
    cy.get('input').type('2')
    cy.get('span').contains(/^bar2$/)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/permanent/target.html')

    // foo should preserve the value from the previous component
    cy.get('span').contains(/^bar2$/)

    // Alpine component should still be working
    cy.get('button').click()
    cy.get('span').contains(/^baz$/)
  })

  it('do not log errors when containing x-for and navigating to a new page', () => {
    cy.visit('/tests/res/turbo/permanent-for/index.html')

    // Check component works correctly
    cy.get('div').find('span').should('have.length', 2)
    cy.get('button').click()
    cy.get('div').find('span').should('have.length', 3)

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/permanent-for/target.html')

    // test
    cy.get('div').find('span').should('have.length', 3)
    cy.window().then((win) => {
      expect(win.console.error).not.to.be.called // eslint-disable-line no-unused-expressions
    })
  })
})
