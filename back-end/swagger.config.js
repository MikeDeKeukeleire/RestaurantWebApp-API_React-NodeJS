module.exports = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Den Tyto API with Swagger",
      version: "0.1.0",
      description: "This is a CRUD API application for a local restaurant made with Koa and documented with Swagger",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "DenTytoAPI",
        url: "https://hogent.be",
        email: "mike.dekeukeleire@student.hogent.be",
      },
    },
    servers: [{
        url: "http://localhost:9000/"
      },
      {
        url: "https://dentyto.herokuapp.com/"
      }
    ],
  },
  apis: ["./src/rest/*.js"],
};