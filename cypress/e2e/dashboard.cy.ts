describe('Dashboard Tests', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('login_url'))
    cy.login(Cypress.env('test_user_email'), Cypress.env('test_user_password'))
    cy.url().should('include', '/dashboard')
  });

  it('should verify default task list', () => {
    cy.fixture('default_tasks.json').then(tasks => {
      tasks.forEach(task => {
        cy.get('td span').should('contain.text', task);
      });
    });
  })

  it('should able to create a new task', () => {
    const taskName = 'Clear the room';
    cy.addTask(taskName);
    cy.get('div#root div p').should('contain', 'Task created');
    cy.get("td span").should('have.length', 4).and('include.text', taskName)
  });

  it('should be able to edit a task', function () {
    // Select the first task row
    cy.get('tr').eq(1).as('selectedRow');

    // Store the original task name for later comparison
    cy.get('@selectedRow').find('td').first().invoke('text').as('originalTaskName');

    // Click the edit button for the selected task
    cy.get('@selectedRow').find('a[href*="/dashboard/edit/"]').click();
    const newTaskName = 'Updated Task Name'
    // Update the task name in the edit form
    cy.get('#task').clear().type(newTaskName);

    // Save the changes
    cy.get("button[type='submit']").click();

    // Verify the task name has been updated and original task is not present
    cy.get("td span").should('not.contain.text', '@originalTaskName')
    cy.get("td span").should('contain.text', newTaskName);
  });

  it('should show error when submitting empty task', () => {
    // Click on the new task button
    cy.get("a[href='/dashboard/new']").click();
    // Click on submit
    cy.get("button[type='submit']").click();
    // Verify error message
    cy.get('#task').invoke('prop', 'validationMessage').should('eq', 'Please fill out this field.')
  });

  it('should show task details', () => {
    let originalTaskName;

    // Click on the task to view its details
    cy.get('tr').eq(1).find('td').first().invoke('text').then(taskName => {
      originalTaskName = taskName;
      cy.get('tr').eq(1).click();
    });

    // Compare task names
    cy.get('p.text-orange-500.mt-4').invoke('text').should(taskDetailName => {
      expect(taskDetailName.trim()).to.eq(originalTaskName.trim());
    });
  });

})