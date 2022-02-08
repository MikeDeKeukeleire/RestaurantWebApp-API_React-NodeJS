const {
  shutdownData,
  getKnex,
  tables
} = require("../src/data");

module.exports = async () => {
  await getKnex()(tables.menu).delete();
  await getKnex()(tables.ingredients).delete();
  await getKnex()(tables.event).delete();
  await getKnex()(tables.user).delete();

  await shutdownData();
};