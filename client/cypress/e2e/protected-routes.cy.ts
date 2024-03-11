describe("Protect routes against unauthorized users", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get(".driver-close-btn").click();
  });

  it("redirect to login when nav to profile", () => {
    cy.getBySel("navbar-profile").click();
    cy.origin(Cypress.env("auth0_domain"), () => {
      cy.url().should("include", `${Cypress.env("auth0_domain")}/u/login`);
    });
  });

  it("redirect to login when nav to analyze", () => {
    cy.getBySel("navbar-analyze").click();
    cy.origin(Cypress.env("auth0_domain"), () => {
      cy.url().should("include", `${Cypress.env("auth0_domain")}/u/login`);
    });
  });

  it("redirect to login when nav to bookkeep", () => {
    cy.getBySel("navbar-bookkeep").click();
    cy.origin(Cypress.env("auth0_domain"), () => {
      cy.url().should("include", `${Cypress.env("auth0_domain")}/u/login`);
    });
  });
});
