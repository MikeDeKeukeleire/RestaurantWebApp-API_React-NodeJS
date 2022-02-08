describe("Add event", () => {
  beforeEach(() => {
    cy.login("Katrien", "12345678");
  });

  it("Add event", () => {
    cy.visit("http://localhost:3000/#/authevents");

    cy.get("[data-cy=event_add_button]").click();
    cy.get("[data-cy=event_date_input]").clear();
    cy.get("[data-cy=event_date_input]").type("2023-12-22");
    cy.get("[data-cy=event_title_input]").clear();
    cy.get("[data-cy=event_title_input]").type("Verjaardag Joeri");
    cy.get("[data-cy=event_description_input]").clear();
    cy.get("[data-cy=event_description_input]").type("Joepie Joerie is jarig");
    cy.get("[data-cy=submit_add_event]").click();
  });

  it("Check if event is added", () => {
    cy.visit("http://localhost:3000/#/authevents#");
    // id 6
    cy.get("[data-cy=event_date]").eq(5).contains("2023-12-22");
    cy.get("[data-cy=event_title]").eq(5).contains("Verjaardag Joeri");
    cy.get("[data-cy=event_description]").eq(5).contains("Joepie Joerie is jarig");
  });

  it("Remove again from db", () => {
    cy.visit("http://localhost:3000/#/authevents#");
    cy.get("[data-cy=event_delete_button]").eq(5).click();
    cy.get("[data-cy=submit_delete_event]").click();
  });

});