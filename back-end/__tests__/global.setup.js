const config = require("config");

const {
  initializeData,
  getKnex,
  tables
} = require("../src/data");
const {
  initializeLogger
} = require("../src/core/logging");
const Role = require("../src/core/roles");

module.exports = async () => {
  initializeLogger({
    level: config.get("log.level"),
    disabled: config.get("log.disabled"),
  });
  await initializeData();

  const knex = getKnex();

  await knex(tables.user).insert([{
    id: "692219d4-251b-495c-bfc4-2512996b6c17",
    username: "Mike test",
    password_hash: "$argon2id$v=19$m=131072,t=6,p=1$9AMcua9h7va8aUQSEgH/TA$TUFuJ6VPngyGThMBVo3ONOZ5xYfee9J1eNMcA5bSpq4", //wachtwoord is 12345678
    roles: JSON.stringify([Role.ADMIN, Role.USER]),
  }, ]);
};