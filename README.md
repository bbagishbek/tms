# Expero QA Test

## How to setup this project

1. Install NodeJS. V18.12.1 is recommended
   <https://nodejs.org/en/download>

2. Install dependencies by executing `npm install` in the project folder

3. Run `npm run start` to start the application locally and browse to `http://localhost:3000/` to start using it.

### Credentials

For this test application, you can login using these credentials:

* User email: `expero@test.com`
* User password: `test`


## Instructions

Expero has developed an application that enables users to login and list, create, update, delete tasks, as well as view their details. There is also an error page we show when an invalid url is used.

Your work is to design a test plan for this application and create the base tests to implement that plan.


## Requirements

At a minimum, your test plan should cover the following cases:

### Authentication

- When entering valid credentials, the user should be redirected to the dashboard page.
- When entering invalid credentials, the user should not be able to login.
- Test credentials inputs for formatting errors, like:
   - Email address format must be valid
   - Password must have more than 3 characters length
- If the user is not logged in, the "Take a look" button should redirect to a page with a preview of the tasks list.

### Dashboard

- The dashboard page should show a list with the default tasks.
- When clicking on a task, the user should be able to see the task details.
- The user should be able to create, update, and delete tasks, and see the changes reflected on the tasks list.
- When the user logs in to the Dashboard, it should show its username, twitter name, and profile image.
- The user should be able to log out from the Dashboard.

### Error page

- The user should see the Error page when an invalid URL is visited.
- The application should redirect the user to / when clicking on "Go back home".


## Additional notes

You are welcome to create additional test cases as you see fit.

There are some bugs in the application that you will discover as you implement the test cases. You do not need to fix
the bugs, just identify them.

ℹ️ You don't need to change any application code, just be focused on designing the test plan and writing your tests.

## What is expected

We expect this test to take 6-8 hours. You can choose the testing framework that is best to test these use cases.

Please provide instructions on how to run the tests when you submit your solution, and how to generate a test report.

Once you've finished, remove the node_modules folder, compress the project and send it back to us.
