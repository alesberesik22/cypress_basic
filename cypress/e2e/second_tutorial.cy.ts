describe("Second test", () => {
  it("Correcly enter cypress website", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
  });
  it("Type into email input", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.get('[placeholder="Email"]')
      .type("test@email.com")
      .should("have.value", "test@email.com");
    cy.wait(2000).then(() => {
      cy.get('[placeholder="Email"').clear().should("be.empty");
    });
  });
  it("Show current class for active page", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.get('[class="dropdown-menu"]')
      .find("li")
      .eq(2)
      .should("have.class", "active");
  });
  it("Should not have active for inactive pages", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.get('[class="dropdown-menu"]')
      .find("li")
      .not(".active")
      .should("have.length", 16)
      .find("a")
      .should("have.attr", "href", "/commands/querying");
  });
  it("Hit checkbox", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.url().should("contain", "/commands/actions#type");
    cy.get('[value="checkbox1"]').eq(0).check().should("be.checked");
  });
  it("Uncheck", () => {
    cy.visit("https://example.cypress.io/commands/actions#type");
    cy.url().should("contain", "/commands/actions#type");
    cy.get('[value="checkbox1"]').eq(2).uncheck().should("not.be.checked");
  });
});
describe("API TESTS", () => {
  before(() => {
    cy.request({
      method: "GET",
      url: "https://api.spacexdata.com/v3/missions",
    }).then((response) => {
      expect(response.body[0]).have.property("mission_name");
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
describe("Main page test", () => {
  beforeEach(() => {
    cy.visit("https://example.cypress.io/");
  });
  after(() => {
    cy.log("all tests are done");
  });
  it("Check h1", () => {
    cy.get("h1").contains("Kitchen Sink");
  });
  it("Click Commands button", () => {
    cy.get('[href="/cypress-api"').contains("Commands").click();
    cy.url()
      .should("contain", "/cypress-api")
      .then(() => {
        expect("Commands.add");
      });
  });
});

describe("Fixtures", () => {
  beforeEach(() => {
    cy.fixture("example").then(function (data) {
      this.data = data;
      cy.log("THIS: ", this.data);
    });
  });
  it("Use before fixture in get request", () => {
    cy.visit("https://example.cypress.io/commands/network-requests");
    cy.intercept("GET", "**/comments/*", this.data).as("getComment");
    cy.get(".network-btn").click();
    cy.wait("@getComment").then((res) => {
      cy.log("Res:", res);
    });
  });
  it("Get data from fixture", () => {
    cy.fixture("example").then((data) => {
      cy.log("DATA", data);
    });
  });
  it("Update fixture data", () => {
    cy.fixture("example")
      .then((data) => {
        data.email = "updated@mail.com";
      })
      .then((data2) => {
        cy.log(data2);
      });
  });
});
