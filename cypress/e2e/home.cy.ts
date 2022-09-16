describe("Home page", () => {
  it("Home page contains explore all roadmaps button", () => {
    cy.visit("https://codedamn.com/");
    cy.contains("Explore All Roadmaps").should("exist");
    cy.get("[data-testid=homepage-cta]").should("exist");
    cy.get(".mt-10 > .block").click();
  });
  it("h1 contains the correct text", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://codedamn.com/");
    cy.get("h1").contains("Learn Programming");
    cy.get(".mt-4 > .bg-gradient-to-r").contains("Interactively");
  });
  it("Menu toggle test", () => {
    cy.viewport("iphone-x");
    cy.visit("https://codedamn.com/");
    cy.get(".flex > .bg-gray-900 > .h-6").click();
  });
  it("Log in", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://codedamn.com/");
    cy.get('[href="/login"]').click();
    cy.url().should("include", "/login");
  });
  it("Links are working fine", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://codedamn.com/");
    cy.get('[href="/login"]').click();
  });
  it.only("Google test", () => {
    cy.viewport(1920, 1080);
    cy.visit("https://www.google.sk/");
    // cy.get('button').contains('Odmietnuť všetko').click()
    cy.get('[name="q"]').type("nieco{enter}");
    // cy.get('[title="Hľadať"]').type("nieco{enter}")
  });
});
