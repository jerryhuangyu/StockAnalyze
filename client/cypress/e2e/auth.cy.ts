const args = { username: "test@gmail.com", password: "Test1234" };

describe("Authentication", () => {
  it("user login flow", () => {
    cy.visit("/");
    cy.get(".driver-close-btn").click();
    cy.getBySel("login-button").click();
    cy.origin(
      Cypress.env("auth0_domain"),
      { args },
      ({ username, password }) => {
        cy.get("input#username").type(username);
        cy.get("input#password").type(password);
        cy.get(".cb2e18c4c").click(); // 繼續 button
      }
    );
  });
});
