const { faker } = require("@faker-js/faker");

describe("Complete Product Testing", () => {
  it("Loads the product page", () => {
    const productName = faker.commerce.productName();
    cy.visit("http://localhost:5173/login");
    cy.get('input[name="email"]')
      .clear()
      .type("sydney.shannon.244535@yopmail.com");
    cy.get('input[name="password"]').clear().type("Abcd@1234");
    cy.get('button[type="submit"]').click();
    // cy.contains("Private Home Page").should("be.visible");
    cy.visit("http://localhost:5173/admin/product");
    cy.get('[data-testid="sidebar-trigger-button"]').click();
    cy.get('[data-testid="create-new-button"]').click();
    cy.get('[data-testid="name-input"]').type(productName);
    cy.get('[data-testid="category-input"]').type(faker.commerce.department());
    cy.get('[data-testid="price-input"]').type(faker.commerce.price());
    cy.get('[data-testid="description-input"]').type(
      faker.commerce.productDescription()
    );
    cy.get('[data-testid="create-button"]').click();
    cy.get('[data-testid="table-cell"]')
      .contains(productName)
      .should("be.visible");
  });
});
