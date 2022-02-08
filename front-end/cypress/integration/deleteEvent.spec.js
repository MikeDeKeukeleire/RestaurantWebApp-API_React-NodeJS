describe("Delete event", () => {
  beforeEach(() => {
    cy.login("Katrien", "12345678");
  });

  it("Delete event", () => {
    cy.visit("http://localhost:3000/#/authevents");

    cy.get("[data-cy=event_delete_button]").eq(0).click();
    cy.get("[data-cy=submit_delete_event]").click();

  });

  it("Add event again", () => {
    cy.visit("http://localhost:3000/#/authevents");

    cy.get("[data-cy=event_add_button]").click();
    cy.get("[data-cy=event_date_input]").clear();
    cy.get("[data-cy=event_date_input]").type("2021-12-25");
    cy.get("[data-cy=event_title_input]").clear();
    cy.get("[data-cy=event_title_input]").type("Kerstdiner");
    cy.get("[data-cy=event_description_input]").clear();
    cy.get("[data-cy=event_description_input]").type("Geen zin om alleen te zijn op kerstdag? Kom mee genieten van ons overheerlijk kerstdiner. Vooraf inschrijven vereist.");
    cy.get("[data-cy=submit_add_event]").click();
  });

});