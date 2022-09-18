describe("Second test", () => {
  it("Correcly enter cypress website", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
  });
  it("Type into email input", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.get('[placeholder="Email"]').type("test@email.com");
    cy.wait(1000).then(() => {
      console.log("test is finished");
    });
  });
  it("Test get rest api", () => {
    cy.visit("http://httpbin.org/");
    cy.request({
      method: "GET",
      url: "http://httpbin.org/get",
    }).then((response) => {
      expect(response.body).have.property("url");
    });
  });
  it("Test post rest api", () => {
    cy.request({
      method: "POST",
      url: "http://httpbin.org/post",
      body: {
        name: "test",
        age: "1",
      },
      headers: {
        "Content-type": "application/json",
      },
    }).then((response) => {
      expect(response.body).have.property("json");
      expect(response.body.json).to.deep.eq({
        name: "test",
        age: "1",
      });
    });
  });
});
