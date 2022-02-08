describe("Edit event", () => {
  beforeEach(() => {
    cy.login("Katrien", "12345678");
  });

  it("Edit event", () => {
    cy.visit("http://localhost:3000/#/authevents");

    cy.get("[data-cy=event_edit_button]").eq(0).click();
    cy.get("[data-cy=event_date_input]").clear();
    cy.get("[data-cy=event_date_input]").type("2021-12-24");
    cy.get("[data-cy=event_title_input]").clear();
    cy.get("[data-cy=event_title_input]").type("Verjaardag Mike");
    cy.get("[data-cy=event_description_input]").clear();
    cy.get("[data-cy=event_description_input]").type("Joepie ik ben jarig");
    cy.get("[data-cy=submit_edit_event]").click();
  });

  it("Check if event is updated", () => {
    cy.visit("http://localhost:3000/#/authevents");
    cy.get("[data-cy=event_date]").eq(0).contains("2021-12-24");
    cy.get("[data-cy=event_title]").eq(0).contains("Verjaardag Mike");
    cy.get("[data-cy=event_description]").eq(0).contains("Joepie ik ben jarig");
  });

  it("Reset event", () => {
    cy.visit("http://localhost:3000/#/authevents");

    cy.get("[data-cy=event_edit_button]").eq(0).click();
    cy.get("[data-cy=event_date_input]").clear();
    cy.get("[data-cy=event_date_input]").type("2021-12-25");
    cy.get("[data-cy=event_title_input]").clear();
    cy.get("[data-cy=event_title_input]").type("Kerstdiner");
    cy.get("[data-cy=event_description_input]").clear();
    cy.get("[data-cy=event_description_input]").type("Geen zin om alleen te zijn op kerstdag? Kom mee genieten van ons overheerlijk kerstdiner. Vooraf inschrijven vereist.");
    cy.get("[data-cy=submit_edit_event]").click();
  });

});