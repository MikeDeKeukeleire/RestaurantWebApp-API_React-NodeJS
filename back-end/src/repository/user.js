const {
    tables,
    getKnex
} = require("../data");
const {
    getChildLogger
} = require("../core/logging");

const findByUsername = (username) => {
    return getKnex()(tables.user)
        .where("username", username)
        .first();
};

module.exports = {
    findByUsername
};