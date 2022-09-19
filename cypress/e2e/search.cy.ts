describe("Search", () => {
  beforeEach(() => {
    cy.fixture("fixture").as("fixtures");
  });

  it("should search for a user and link to their github profile", function () {
    const { baseUrl, searchQuery, username, htmlUrl } = this.fixtures;

    cy.visit(baseUrl);

    cy.get('input[aria-label="Search users"]').type(searchQuery);
    cy.get('button[type="submit"').click();
    cy.get('button[type="submit"]').should("be.disabled");

    cy.url().should("include", "/searchResults");

    cy.get(".result").eq(1).should("contain", username);
    cy.get(".result").should("have.length", 4);

    cy.get(".result a").eq(1).should("have.attr", "href", htmlUrl);
  });

  it("should move to the next and previous page", function () {
    const { baseUrl, searchQuery, username } = this.fixtures;

    cy.intercept("GET", "https://api.github.com/search/users?*").as("getUsers");

    cy.visit(baseUrl);

    cy.get('input[aria-label="Search users"]').type(searchQuery);
    cy.get('button[type="submit"').click();
    cy.get('button[type="submit"]').should("be.disabled");

    cy.wait("@getUsers");

    cy.url().should("include", "/searchResults");

    cy.get('button[name="next"]').click();
    cy.get('button[name="next"]').should("be.disabled");

    cy.wait("@getUsers");

    cy.get('button[name="next"]').should("not.be.disabled");
    cy.get(".result").eq(1).should("not.contain", username);

    cy.get('button[name="prev"]').click();
    cy.get('button[name="prev"]').should("be.disabled");

    cy.wait("@getUsers");

    cy.get('button[name="prev"]').should("be.disabled");
  });
});
