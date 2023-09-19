describe('Page Not Found Tests', () => {

  it('should redirect to page not found when endpoint does not exist', () => {
    cy.visit('http://localhost:3000/admin')
    cy.get('h1').should('contain.text', 'Oops that did not worked')
  })

  it('should redirect to page not found when clicking on take a look', () => {
    cy.visit(Cypress.env('login_url'))
    cy.get('a').contains('Or take a look').click()
    cy.get('h1').should('contain.text', 'Oops that did not worked')
  })

  it('should take to the home page when clicking on Go Back Home', () => {
    cy.visit(Cypress.env('not_found'))
    cy.get('a').contains('Go back home').click()
  })
})