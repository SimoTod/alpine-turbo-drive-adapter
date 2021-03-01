/* global describe, it, cy */

describe('form submission', () => {
  it('should not break alpine when an error occours', () => {
    cy.intercept('POST', 'http://127.0.0.1:8080/tests/res/turbo/form/error.html', {
      statusCode: 422,
      body: 'Invalid'
    })

    cy.visit('/tests/res/turbo/form/index.html')

    // Check Alpine started correctly
    cy.get('span').contains(/^bar$/)

    // Submit form
    cy.get('input[type="submit"]').click()

    // Check Alpine is not broken
    cy.get('span').contains(/^bar$/)
  })
})
