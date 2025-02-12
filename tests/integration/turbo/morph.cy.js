/* global describe, it, cy */

describe('turbo-stream', () => {
  it('should render correctly when navigating away and back', () => {
    // Mock post request
    const streamMessage = '<turbo-stream action="refresh"></turbo-stream>'
    cy.intercept('http://localhost:8080/stream', {
      statusCode: 200,
      body: streamMessage,
      headers: {
        'Content-Type': 'text/vnd.turbo-stream.html; charset=utf-8'
      }
    }).as('Stream')

    // Mock refresh request
    const refreshResponse = `
      <html>
        <head>
          <script src="https://cdn.jsdelivr.net/npm/@hotwired/turbo/dist/turbo.es2017-umd.min.js"></script>
          <script src="/dist/alpine-turbo-drive-adapter.js" defer></script>
          <script src="//unpkg.com/alpinejs" defer></script>
          <meta name="turbo-refresh-method" content="morph">
        </head>
        <body>
          <span x-data="{foo: 'bar'}" x-text="foo"></span>
        </body>
      </html>`
    cy.intercept('http://localhost:8080/tests/res/turbo/stream/index.html', {
      statusCode: 200,
      body: refreshResponse
    }).as('Refresh')

    cy.visit('/tests/res/turbo/stream/index.html')

    cy.get('span').contains(/^Waiting...$/)

    // Submit form returning the turbo stream snippet
    cy.get('input').click()
    cy.wait('@Stream')
    cy.wait('@Refresh')

    // Check Alpine component was initialised correctly
    cy.get('span').contains(/^bar$/)
  })
})
