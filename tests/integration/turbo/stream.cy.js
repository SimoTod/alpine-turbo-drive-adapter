/* global describe, it, cy */

describe('turbo-stream', () => {
  it.skip('should render correctly when navigating away and back', () => {
    // Mock for response
    const streamMessage = '<turbo-stream action="replace" target="stream">' +
      '<template>' +
      '<span x-data="{foo: \'bar\'}" x-text="foo">' +
      '</template>' +
      '</turbo-stream>'
    cy.intercept('http://localhost:8080/stream', {
      statusCode: 200,
      body: streamMessage,
      headers: {
        'Content-Type': 'text/vnd.turbo-stream.html; charset=utf-8'
      }
    }).as('Stream')

    cy.visit('/tests/res/turbo/stream/index.html')

    // Navigate to the second page
    cy.get('a').click()
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/stream/target.html')

    // Navigate back
    cy.go('back')
    cy.url().should('equal', 'http://localhost:8080/tests/res/turbo/stream/index.html')

    cy.get('span').contains(/^Waiting...$/)

    // Submit form returning the turbo stream snippet
    cy.get('input').click()
    cy.wait('@Stream')

    // Check Alpine component was initialised correctly
    cy.get('span').contains(/^bar$/)
  })
})
