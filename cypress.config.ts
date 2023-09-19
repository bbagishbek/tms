import { defineConfig } from "cypress";

export default defineConfig({
  env: {
    login_url: "http://localhost:3000/",
    dashboard_url: "http://localhost:3000/dashboard",
    not_found: 'http://localhost:3000/invalid-url',
    test_user_email: "expero@test.com",
    test_user_password: "test",
    login_header: 'Log in to your account'
  },

  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
