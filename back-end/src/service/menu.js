const config = require("config");
const {
    getChildLogger
} = require("../core/logging");
const menuRepository = require("../repository/menu");

const DEFAULT_PAGINATION_LIMIT = config.get("pagination.limit");
const DEFAULT_PAGINATION_OFFSET = config.get("pagination.offset");

const debugLog = (message, meta = {}) => {
    if (!this.logger) this.logger = getChildLogger("menu-service");
    this.logger.debug(message, meta);
};

const getAll = async (
    limit = DEFAULT_PAGINATION_LIMIT,
    offset = DEFAULT_PAGINATION_OFFSET,
) => {
    debugLog("Fetching all menus", {
        limit,
        offset
    });
    const data = await menuRepository.findAll({
        limit,
        offset
    });
    return {
        data,
        limit,
        offset
    };
};

const updateById = (id, {
    price,
    ingredients
}) => {
    const updatedMenu = {
        price,
        ingredients
    };
    debugLog(`Updating menu with id ${id}`, updatedMenu);
    return menuRepository.updateById(id, updatedMenu);
};

module.exports = {
    getAll,
    updateById,
};