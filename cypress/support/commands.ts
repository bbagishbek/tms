// cypress/support/commands.js
Cypress.Commands.add('login', (email, password) => {
    cy.visit('http://localhost:3000/')
    cy.get('#email-address').type(email)
    cy.get('#password').type(password)
    cy.get('button[type="submit"]').click()
})

Cypress.Commands.add('addTask', (taskName) => {
    cy.get("a[href='/dashboard/new']").click();
    cy.get('#task').type(taskName);
    cy.get("button[type='submit']").click();
})

Cypress.Commands.add('editTask', (taskName) => {
    cy.get("a[href='/dashboard/new']").click();
    cy.get('#task').type(taskName);
    cy.get("button[type='submit']").click();
})

