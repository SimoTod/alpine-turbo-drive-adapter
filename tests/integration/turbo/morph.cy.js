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
    const refreshResponse = `
      <body>
        <div x-data="{foo: 'xyz'}">
          <span x-text="foo"></span>
          <p x-show="foo === 'success'" x-cloak>I'm hidden</p>
          <em x-ignore x-show="foo === 'success'" x-cloak>I'm always visible</em>
          <button @click="foo = 'success'">Change Text</button>

          <template x-teleport="#sub-context">
            <div id="teleported" x-show="foo === 'success'">Teleported into gray box</div>
          </template>

          <div id="sub-context" x-data="{list: ['1', '2', '3']}" style="background-color: lightgray;">
          <ul style="border: black 1;">
            <template x-for="i in 3">
              <li x-text="i"></li>
            </template>
          </ul>
        </div>
      </body>`
    cy.intercept('/tests/res/turbo/morph/initialization/index.html', {
      statusCode: 200,
      body: refreshResponse
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

    const refreshResponse = `
      <body>
        <div x-data="{foo: 'xyz'}">
          <span x-text="foo"></span>
          <p x-show="foo === 'success'" x-cloak>I'm hidden at first</p>
          <template x-teleport="#sub-context">
            <div id="teleported" x-show="foo === 'success'">Teleported into gray box</div>
          </template>

          <button @click="foo = 'success'">Change Text</button>

          <div id="sub-context"></div>
        </div
      </body>`
    cy.intercept('/tests/res/turbo/morph/interactivity/index.html', {
      statusCode: 200,
      body: refreshResponse
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
    cy.intercept('/frame', {
      body: '<turbo-frame id="frame"><p x-show="shown">Refreshed</p></turbo-frame>'
    }).as('FrameRefresh')

    cy.visit('/tests/res/turbo/morph/frame/index.html')

    cy.get('p').should('contain', 'Initial Content')

    cy.get('button').click()
    cy.wait('@FrameRefresh')

    cy.get('p').should('be.visible')
    cy.get('p').should('contain', 'Refreshed')
  })
})
