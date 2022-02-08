const uuid = require("uuid");
const {
    tables,
    getKnex
} = require("../data/index");
const {
    getChildLogger
} = require("../core/logging");

const updateById = async (id, {
    ingredients
}) => {
    try {
        await getKnex()(tables.ingredients)
            .update({
                ingredients
            })
            .where("id", id);


    } catch (error) {
        const logger = getChildLogger("ingredients-repo");
        logger.error("Error in updateById", {
            error,
        });
        throw error;
    }
};

const deleteById = async (id) => {
    try {
        const rowsAffected = await getKnex()(tables.ingredients)
            .delete()
            .where("id", id);

        return rowsAffected > 0;
    } catch (error) {
        const logger = getChildLogger("ingredients-repo");
        logger.error("Error in deleteById", {
            error,
        });
        throw error;
    }
};

module.exports = {
    updateById,
    deleteById,
};