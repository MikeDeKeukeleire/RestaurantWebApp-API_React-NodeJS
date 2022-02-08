const {
    tables,
    getKnex
} = require("../data/index");
const {
    getChildLogger
} = require("../core/logging");
const ingredientsRepo = require("../repository/ingredients");

const formatMenu = ({
    menu_id,
    menu_name,
    menu_price,
    menu_thumbnail,
    ingredients_id,
    ingredients_ingredients,
}) => ({
    id: menu_id,
    name: menu_name,
    price: menu_price,
    thumbnail: menu_thumbnail,
    ingredients: {
        id: ingredients_id,
        ingredients: ingredients_ingredients,
    },
})

const findAll = async ({
    limit,
    offset,
}) => {
    const allMenus = await getKnex()(tables.menu)
        .select([
            `${tables.menu}.id as menu_id`, `${tables.menu}.name as menu_name`, `${tables.menu}.price as menu_price`, `${tables.menu}.thumbnail as menu_thumbnail`,
            `${tables.ingredients}.id as ingredients_id`, `${tables.ingredients}.ingredients as ingredients_ingredients`,
        ])
        .join(tables.ingredients, `${tables.menu}.ingredientsId`, "=", `${tables.ingredients}.id`)
        .limit(limit)
        .offset(offset)

    return allMenus.map(formatMenu);
};

const updateById = async (id, {
    price,
    ingredients
}) => {
    try {
        await getKnex()(tables.menu)
            .update({
                price,
            })
            .where("id", id);
        const updateIngredients = await ingredientsRepo.updateById(id, {
            ingredients
        });
    } catch (error) {
        const logger = getChildLogger("menu-repo");
        logger.error("Error in updateById", {
            error,
        });
        throw error;
    }
};

module.exports = {
    findAll,
    updateById,
};