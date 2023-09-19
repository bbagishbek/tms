describe('Login Tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('login_url'))
  });

  it('should log in with valid credentials', () => {
    cy.login(Cypress.env('test_user_email'), Cypress.env('test_user_password'))
    cy.url().should('include', '/dashboard')
    cy.get('span[data-testid=twitterName]').should('have.text', "@experoinc")
  })

  it('should log out successfully', () => {
    cy.login(Cypress.env('test_user_email'), Cypress.env('test_user_password'))
    cy.url().should('include', '/dashboard')
    cy.get('a').contains('Logout').click()
    cy.get('h2').should('have.text', Cypress.env('login_header'))
  })

  it('should not go to dashboard without login in', () => {
    cy.visit(Cypress.env('dashboard_url'))
    cy.get('h2').should('have.text', Cypress.env('login_header'))
  })

  it('unsuccessful login with invalid credentials', () => {
    cy.login(Cypress.env('test_user_email'), 'invalid_password')
    cy.get('button[type="submit"]').should('have.text', "Log in")
  })

  it('email format should be valid', () => {
    let email = 'expero'
    cy.login(email, 'invalid_password')
    cy.get('button[type="submit"]').should('have.text', "Log in")
    cy.get('#email-address').invoke('prop', 'validationMessage').should('eq', `Please include an '@' in the email address. '${email}' is missing an '@'.`)
  })

  it('password should have more than 3 characters', () => {
    let email = 'random@test.com'
    cy.login(email, '123')
    cy.get('button[type="submit"]').should('have.text', "Log in")
    cy.get('#password').invoke('prop', 'validationMessage').should('eq', 'Password must be at least 4 characters')
  })

  it('should not accept empty email', () => {
    cy.get('#password').type('12345')
    cy.get('#email-address').invoke('prop', 'validationMessage').should('eq', 'Please fill out this field.')
    cy.get('button[type="submit"]').click()
  })

  it('should not accept empty password', () => {
    cy.get('#email-address').type(Cypress.env('test_user_email'))
    cy.get('#password').invoke('prop', 'validationMessage').should('eq', 'Please fill out this field.')
    cy.get('button[type="submit"]').click()
  })
})