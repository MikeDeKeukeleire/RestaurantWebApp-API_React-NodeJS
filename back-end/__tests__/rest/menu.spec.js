const {
  tables
} = require("../../src/data");
const {
  loginAdmin,
  withServer
} = require("../supertest.setup");

const data = {
  menu: [{
      id: "09eb1901-5d87-4f44-a973-3ab7640c9029",
      ingredientsId: "09eb1901-5d87-4f44-a973-3ab7640c9029",
      name: "Sushi",
      price: 9,
      thumbnail: "https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg",
    },
    {
      id: "9a7aaec6-491e-4088-8f6b-474d2f540852",
      ingredientsId: "9a7aaec6-491e-4088-8f6b-474d2f540852",
      name: "Gebraden kip",
      price: 6,
      thumbnail: "https://cdn.pixabay.com/photo/2016/02/14/10/39/chicken-1199243_960_720.jpg",
    },
    {
      id: "f3a6d58f-da1c-4939-b1b0-382aac35038d",
      ingredientsId: "f3a6d58f-da1c-4939-b1b0-382aac35038d",
      name: "Biefstuk met friet",
      price: 18,
      thumbnail: "https://cdn.pixabay.com/photo/2018/08/29/19/03/steak-3640560_960_720.jpg",
    },
  ],
  ingredients: [{
      id: "09eb1901-5d87-4f44-a973-3ab7640c9029",
      ingredients: "Rijst, vis, wasabi, zeewier",
    },
    {
      id: "9a7aaec6-491e-4088-8f6b-474d2f540852",
      ingredients: "Rijst, vis, wasabi, zeewier",
    }, {
      id: "f3a6d58f-da1c-4939-b1b0-382aac35038d",
      ingredients: "Biefstuk, frietjes, groenten",
    },
  ],
};

const dataToDelete = {
  menu: [
    "09eb1901-5d87-4f44-a973-3ab7640c9029",
    "9a7aaec6-491e-4088-8f6b-474d2f540852",
    "f3a6d58f-da1c-4939-b1b0-382aac35038d",
  ],
  ingredients: ["09eb1901-5d87-4f44-a973-3ab7640c9029",
    "9a7aaec6-491e-4088-8f6b-474d2f540852",
    "f3a6d58f-da1c-4939-b1b0-382aac35038d",
  ],
};

describe("Menu", () => {
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

  const url = "/api/menus";

  describe("GET /api/menus", () => {
    beforeAll(async () => {
      await knex(tables.ingredients).insert(data.ingredients);
      await knex(tables.menu).insert(data.menu);
    });

    afterAll(async () => {
      await knex(tables.menu)
        .whereIn("id", dataToDelete.menu)
        .delete();

      await knex(tables.ingredients)
        .whereIn("id", dataToDelete.ingredients)
        .delete();
    });

    test("it should 200 and return all menus", async () => {
      const response = await request.get(url)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.limit).toBe(100);
      expect(response.body.offset).toBe(0);
      expect(response.body.data.length).toBe(3);
    });


    test("it should 200 and paginate the list of menu", async () => {
      const response = await request.get(url)
        .set("Authorization", loginHeader);
      expect(response.status).toBe(200);
      expect(response.body.data.length).toBe(3);
      expect(response.body.data[0]).toEqual({
        id: "09eb1901-5d87-4f44-a973-3ab7640c9029",
        name: "Sushi",
        price: 9,
        thumbnail: "https://cdn.pixabay.com/photo/2017/10/15/11/41/sushi-2853382_960_720.jpg",
        ingredients: {
          id: "09eb1901-5d87-4f44-a973-3ab7640c9029",
          ingredients: "Rijst, vis, wasabi, zeewier",
        },
      });
      expect(response.body.data[1]).toEqual({
        id: "9a7aaec6-491e-4088-8f6b-474d2f540852",
        name: "Gebraden kip",
        price: 6,
        thumbnail: "https://cdn.pixabay.com/photo/2016/02/14/10/39/chicken-1199243_960_720.jpg",
        ingredients: {
          id: "9a7aaec6-491e-4088-8f6b-474d2f540852",
          ingredients: "Rijst, vis, wasabi, zeewier",
        },
      });
      expect(response.body.data[2]).toEqual({
        id: "f3a6d58f-da1c-4939-b1b0-382aac35038d",
        name: "Biefstuk met friet",
        price: 18,
        thumbnail: "https://cdn.pixabay.com/photo/2018/08/29/19/03/steak-3640560_960_720.jpg",
        ingredients: {
          id: "f3a6d58f-da1c-4939-b1b0-382aac35038d",
          ingredients: "Biefstuk, frietjes, groenten",
        },
      });
    });
  });

  describe("PUT /api/menus/:id", () => {

    beforeAll(async () => {
      await knex(tables.ingredients).insert(data.ingredients);
      await knex(tables.menu).insert(data.menu);
    });

    afterAll(async () => {
      await knex(tables.menu)
        .whereIn("id", dataToDelete.menu)
        .delete();

      await knex(tables.ingredients)
        .whereIn("id", dataToDelete.ingredients)
        .delete();
    });

    test("it should 200 and return nothing", async () => {
      const response = await request.put(`${url}/09eb1901-5d87-4f44-a973-3ab7640c9029`)
        .set("Authorization", loginHeader)
        .send({
          price: 10,
          ingredients: "Rijst, krab, zeewier, sojasaus"
        });
      expect(response.status).toBe(204);
    });
  });

});