const {
  tables
} = require("../../src/data");
const {
  loginAdmin,
  withServer
} = require("../supertest.setup");

const data = {
  event: [{
      id: "0ccc7190-d664-4843-b97a-5b63e5b0d43e",
      date: "2021-12-25",
      title: "Kerstdiner",
      description: "Geen zin om alleen te zijn op kerstdag? Kom mee genieten van ons overheerlijk kerstdiner. Vooraf inschrijven vereist.",
    },
    {
      id: "2d6d28aa-d78a-46e6-9952-ab1c4cce342a",
      date: "2021-12-31",
      title: "Oudjaar party",
      description: "Wil jij ook het nieuwe jaar met een KNAL inzetten? Vier dan met ons mee!",
    },
    {
      id: "64ec5914-43b1-4dc1-93e6-dc1193ad1edf",
      date: "2022-01- 01",
      title: "Nieuwjaars drink",
      description: "Na de familiebezoeken zin in een leuke afsluiter? Kom dan gezellig eens langs op onze nieuwjaars drink!",
    },
  ]
};

const dataToDelete = {
  event: [
    "0ccc7190-d664-4843-b97a-5b63e5b0d43e",
    "2d6d28aa-d78a-46e6-9952-ab1c4cce342a",
    "64ec5914-43b1-4dc1-93e6-dc1193ad1edf",
  ],
};

describe("Event", () => {
  let request;
  let knex;
  let loginHeader;

  withServer(({
    knex: k,
    supertest: s
  }) => {
    knex = k;
    request = s;
  });

  beforeAll(async () => {
    loginHeader = await loginAdmin(request);
  });

  const url = "/api/events";

  describe("GET /api/events", () => {
    beforeAll(async () => {
      await knex(tables.event).insert(data.event);
    });

    afterAll(async () => {
      await knex(tables.event)
        .whereIn("id", dataToDelete.event)
        .delete();
    });

    test("it should 200 and return all events", async () => {
      const response = await request.get(url)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(3);
    });


    test("it should 200 and paginate the list of events", async () => {
      const response = await request.get(url)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
      expect(response.body.data[0]).toEqual({
        id: "0ccc7190-d664-4843-b97a-5b63e5b0d43e",
        date: "2021-12-25",
        title: "Kerstdiner",
        description: "Geen zin om alleen te zijn op kerstdag? Kom mee genieten van ons overheerlijk kerstdiner. Vooraf inschrijven vereist.",
      });
      expect(response.body.data[1]).toEqual({
        id: "2d6d28aa-d78a-46e6-9952-ab1c4cce342a",
        date: "2021-12-31",
        title: "Oudjaar party",
        description: "Wil jij ook het nieuwe jaar met een KNAL inzetten? Vier dan met ons mee!",
      });
      expect(response.body.data[2]).toEqual({
        id: "64ec5914-43b1-4dc1-93e6-dc1193ad1edf",
        date: "2022-01- 01",
        title: "Nieuwjaars drink",
        description: "Na de familiebezoeken zin in een leuke afsluiter? Kom dan gezellig eens langs op onze nieuwjaars drink!",
      });
    });
  });

  describe("PUT /api/events/:id", () => {

    beforeAll(async () => {
      await knex(tables.event).insert(data.event);
    });

    afterAll(async () => {
      await knex(tables.event)
        .whereIn("id", dataToDelete.event)
        .delete();
    });

    test("it should 200 and return the updated event", async () => {
      const response = await request.put(`${url}/0ccc7190-d664-4843-b97a-5b63e5b0d43e`)
        .set("Authorization", loginHeader)
        .send({
          date: "2021-12-15",
          title: "Verjaardags party",
          description: "Feest lekker mee!",
        });
      expect(response.status).toBe(200);
      expect(response.body.id).toBeTruthy();
      expect(response.body.date).toBe("2021-12-15");
      expect(response.body.title).toBe("Verjaardags party");
      expect(response.body.description).toBe("Feest lekker mee!");
    });
  });

  describe("POST /api/events", () => {

    beforeAll(async () => {
      await knex(tables.event).insert(data.event);
    });

    afterAll(async () => {
      await knex(tables.event)
        .whereIn("id", dataToDelete.event)
        .delete();
    });

    test("it should 201 and return the created event", async () => {
      const response = await request.post(url)
        .set("Authorization", loginHeader)
        .send({
          date: "2021-12-15",
          title: "Verjaardags party",
          description: "Feest lekker mee!",
        });
      expect(response.status).toBe(201);
      expect(response.body.id).toBeTruthy();
      expect(response.body.date).toBe("2021-12-15");
      expect(response.body.title).toBe("Verjaardags party");
      expect(response.body.description).toBe("Feest lekker mee!");
    });
  });

  describe("DELETE /api/events/:id", () => {
    beforeAll(async () => {
      await knex(tables.event).insert(data.event);
    });

    afterAll(async () => {
      await knex(tables.event)
        .whereIn("id", dataToDelete.event)
        .delete();
    });

    test("it should 204 and return nothing", async () => {
      const response = await request.delete(`${url}/2d6d28aa-d78a-46e6-9952-ab1c4cce342a`).set("Authorization", loginHeader);
      expect(response.status).toBe(204);
    });
  });

});