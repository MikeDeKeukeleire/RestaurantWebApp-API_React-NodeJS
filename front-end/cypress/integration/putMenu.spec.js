describe("Edit menu", () => {
  beforeEach(() => {
    cy.login("Katrien", "12345678");
  });

  it("Edit menu", () => {
    cy.visit("http://localhost:3000/#/authkaart");

    cy.get("[data-cy=menu_edit_button]").eq(0).click();
    cy.get("[data-cy=menu_ingredients_input]").clear();
    cy.get("[data-cy=menu_ingredients_input]").type("Spaghetti, carbonara saus, kaas");
    cy.get("[data-cy=menu_price_input]").clear();
    cy.get("[data-cy=menu_price_input]").type(8);
    cy.get("[data-cy=submit_edit_menu]").click();
  });

  it("Check if menu is updated", () => {
    cy.visit("http://localhost:3000/#/authkaart");
    cy.get("[data-cy=menu_ingredients]").eq(0).contains("Spaghetti, carbonara saus, kaas");
    cy.get("[data-cy=menu_price]").eq(0).contains(8);
  });

  it("Reset menu", () => {
    cy.visit("http://localhost:3000/#/authkaart");

    cy.get("[data-cy=menu_edit_button]").eq(0).click();
    cy.get("[data-cy=menu_ingredients_input]").clear();
    cy.get("[data-cy=menu_ingredients_input]").type("Spaghetti, bolognaisesaus, kaas");
    cy.get("[data-cy=menu_price_input]").clear();
    cy.get("[data-cy=menu_price_input]").type(12);
    cy.get("[data-cy=submit_edit_menu]").click();
  });

});