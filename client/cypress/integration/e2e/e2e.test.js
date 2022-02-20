describe("Open App", () => {
  before(() => {
    cy.visit("http://localhost");
  });

  it("Opens", () => {
    cy.contains("Enter").click();

    cy.url().should("include", "room");

    cy.get(".MuiPaper-root").children().should("contain", "Connected");
  });

  it("Sends messages", () => {
    cy.get(".MuiOutlinedInput-input").type("Hello");
    cy.get(".MuiButton-root").click();

    cy.get(".MuiOutlinedInput-input").type("Testing input{enter}");

    cy.get(".messages").should("contain", "Hello");

    cy.get(".messages").should("contain", "Testing input");
  });
});
