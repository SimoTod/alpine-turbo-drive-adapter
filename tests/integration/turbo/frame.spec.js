/* global describe, it, cy */

describe('turbo-frame', () => {
  it('work correctly with Alpine', () => {
    cy.visit('/tests/res/turbo/frame/index.html')

    // Navigate to the second page
    cy.get('a').click()

    // test
    cy.get('span').contains(/^bar$/)
  })

  it('work correctly with Alpine when lazyloaded', () => {
    cy.visit('/tests/res/turbo/frame-lazy/index.html')

    cy.get('p').contains(/^Foo$/)
    cy.get('span').contains(/^bar$/)

    // Navigate to the second page
    cy.get('a').click()

    // test
    cy.get('span').contains(/^bar$/)
    cy.get('p').contains(/^Foo$/)
  })

  it('work correctly with Alpine when lazyloaded and using navigation top', () => {
    cy.visit('/tests/res/turbo/frame-lazy-top/index.html')

    cy.get('p').contains(/^Foo$/)
    cy.get('span').contains(/^bar$/)

    // Navigate to the second page
    cy.get('a').click()

    // test
    cy.get('span').contains(/^bar$/)
    cy.get('p').contains(/^Foo$/)
  })
})
