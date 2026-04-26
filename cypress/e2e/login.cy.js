describe("login visible test", () => {
  it("logs in", () => {
    cy.visit("http://localhost:5173/login");
    cy.get('input[name="email"]')
      .clear()
      .type("sydney.shannon.244535@yopmail.com");
    cy.get('input[name="password"]').clear().type("Abcd@1234");
    cy.get('button[type="submit"]').click();
    cy.contains("Private Home Page").should("be.visible");
  });
});
