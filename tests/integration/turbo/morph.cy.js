/* global describe, it, cy, beforeEach */

describe('morphing', () => {
  beforeEach(() => {
    // Mock form submission request
    cy.intercept('/morph', {
      body: '<html><turbo-stream action="refresh"></turbo-stream></html>',
      headers: { 'Content-Type': 'text/vnd.turbo-stream.html; charset=utf-8' }
    })
  })

  it('should initialize after morphing', () => {
    cy.visit('/tests/res/turbo/morph/initialization/index.html')
    cy.get('p').should('not.be.visible')
    cy.get('em').should('be.visible')
    cy.get('span').should('contain', 'abc')

    // Mock refresh response
    cy.intercept('/tests/res/turbo/morph/initialization/index.html', {
      fixture: 'morph/initialization.html'
    }).as('Refresh')

    // Kickstart the morph
    cy.get('input[type="submit"]').click()
    cy.wait('@Refresh')

    cy.get('span').should('contain', 'xyz')
    cy.get('p').should('not.be.visible')
    cy.get('em').should('be.visible')
    cy.get('#sub-context').should('be.visible')
    cy.get('#sub-context').within(() => {
      cy.get('#teleported').should('not.be.visible')
    })
  })

  it('should maintain interactivity after morphing', () => {
    cy.visit('/tests/res/turbo/morph/interactivity/index.html')

    // Mock refresh response
    cy.intercept('/tests/res/turbo/morph/interactivity/index.html', {
      fixture: 'morph/interactivity.html'
    }).as('Refresh')

    // Kickstart the morph
    cy.get('input[type="submit"]').click()
    cy.wait('@Refresh')

    cy.get('#teleported').should('not.be.visible')
    cy.get('p').should('not.be.visible')

    cy.get('button').click()
    cy.get('span').should('contain', 'success')
    cy.get('p').should('be.visible')
    cy.get('#sub-context').within(() => {
      cy.get('#teleported').should('be.visible')
    })
  })

  it('should initialize after a Turbo Frame morph', () => {
    const body = '<turbo-frame id="frame"><p x-show="shown">Refreshed</p></turbo-frame>'
    cy.intercept('/frame', { body }).as('FrameRefresh')

    cy.visit('/tests/res/turbo/morph/frame/index.html')

    cy.get('p').should('contain', 'Initial Content')

    cy.get('button').click()
    cy.wait('@FrameRefresh')

    cy.get('p').should('be.visible')
    cy.get('p').should('contain', 'Refreshed')
  })
})
