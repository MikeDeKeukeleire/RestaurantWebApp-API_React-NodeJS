const Role = require("../core/roles");

let MENU = [{
  id: "65187625-4edd-4db7-b745-dc9b6c5138d4",
  name: "Croque",
  price: 4.5,
  ingredientsId: "65187625-4edd-4db7-b745-dc9b6c5138d4",
  thumbnail: "https://cdn.pixabay.com/photo/2017/04/13/02/58/grilled-cheese-2226460_960_720.jpg",
}, {
  id: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e",
  name: "Spaghetti",
  price: 12,
  ingredientsId: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e",
  thumbnail: "https://cdn.pixabay.com/photo/2018/07/18/19/12/pasta-3547078_960_720.jpg",
}, {
  id: "aa43ca1b-ab13-4a5e-9956-9a70088ece56",
  name: "Tapasbordje",
  price: 10,
  ingredientsId: "aa43ca1b-ab13-4a5e-9956-9a70088ece56",
  thumbnail: "https://cdn.pixabay.com/photo/2017/08/25/14/15/ketering-2680316_960_720.jpg",
}, {
  id: "4aa8b07e-7b18-4585-89f4-8365aa2d8f2a",
  name: "Warme hapjes",
  price: 12,
  ingredientsId: "4aa8b07e-7b18-4585-89f4-8365aa2d8f2a",
  thumbnail: "https://cdn.pixabay.com/photo/2021/10/15/11/05/pizza-6712121_960_720.jpg",
}, ];

let INGREDIENTS = [{
  id: "65187625-4edd-4db7-b745-dc9b6c5138d4",
  ingredients: "Brood, ham, kaas, ketchup/mayonaise",
}, {
  id: "0d10a76a-9adf-4eaf-8f75-72279a0ba91e",
  ingredients: "Spaghetti, bolognaisesaus, kaas",
}, {
  id: "aa43ca1b-ab13-4a5e-9956-9a70088ece56",
  ingredients: "Salami, kaas, pesto, wraps",
}, {
  id: "4aa8b07e-7b18-4585-89f4-8365aa2d8f2a",
  ingredients: "Kipnuggets, bitterballen, frikandelletjes",
}, ];
let USER = [{
  id: "f110e523-985c-4077-b3b5-a667d9551b53",
  username: "Katrien",
  password_hash: "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4", //wachtwoord is 12345678
  roles: JSON.stringify([Role.ADMIN, Role.USER]),
}, ];
let EVENT = [{
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
    date: "2022-01-01",
    title: "Nieuwjaars drink",
    description: "Na de familiebezoeken zin in een leuke afsluiter? Kom dan gezellig eens langs op onze nieuwjaars drink!",
  },
  {
    id: "364c6cdb-2016-4761-b8b9-f79d8cbe7b43",
    date: "2022-03-16",
    title: "Night w/ De Kreuners",
    description: "De Kreuners komen naar ons nederig gelegen eetcafétje! Wie wil daar nu niet bij zijn?",
  },
  {
    id: "b7dad6a7-0dd7-4399-9fd8-3b00277a49a1",
    date: "2022-04-29",
    title: "Biljart tornooi",
    description: "Ben jij de beste biljart speler van Ursel en omstreken? Kom dat dan bewijzen op ons jaarlijks birljar tornooi!",
  },
];

module.exports = {
  MENU,
  INGREDIENTS,
  USER,
  EVENT
};