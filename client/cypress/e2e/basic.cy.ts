import { isMobile } from "../support/utils";

describe("Home page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("show company logo and text", () => {
    cy.getBySel("company-logo").should("be.visible");
    cy.getBySel("company-logo").should("have.text", "S-Insight");
  });

  it("show onboard guide", () => {
    cy.get("#driver-popover-item").should("be.visible");
    if (isMobile()) {
      new Array(2).fill(0).forEach(() => cy.get(".driver-next-btn").click());
    } else {
      new Array(4).fill(0).forEach(() => cy.get(".driver-next-btn").click());
    }
    cy.get("#driver-popover-item")
      .should("have.css", "display")
      .and("eq", "none");
  });

  it("show onboard guide only once", () => {
    cy.get(".driver-close-btn").click();
    cy.visit("/");
    cy.get(".driver-close-btn").should("not.exist");
  });
});
