/* global describe, it, cy */

describe('form submission', () => {
  it('should not break alpine when an error occours', () => {
    const page = '<div x-data="{foo: \'bar\'}"><span x-text="foo"></span</div>'

    cy.intercept('POST', 'http://127.0.0.1:8080/tests/res/turbo/form/error.html', {
      statusCode: 422,
      body: page,
      headers: {
        'Content-Type': 'text/html; charset=UTF-8'
      }
    })

    cy.visit('/tests/res/turbo/form/index.html')

    // Submit form
    cy.get('input[type="submit"]').click()

    // Check Alpine is not broken
    cy.get('span').contains(/^bar$/)
  })
})
