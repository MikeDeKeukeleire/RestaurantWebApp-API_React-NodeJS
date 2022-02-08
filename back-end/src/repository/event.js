const uuid = require("uuid");
const {
  tables,
  getKnex
} = require("../data/index");
const {
  getChildLogger
} = require("../core/logging");

const findAll = ({
  limit,
  offset,
}) => {
  return getKnex()(tables.event)
    .select()
    .limit(limit)
    .offset(offset)
    .orderBy("date", "ASC");
};

const create = async ({
  date,
  title,
  description,
}) => {
  try {
    const id = uuid.v4();
    await getKnex()(tables.event)
      .insert({
        id,
        date,
        title,
        description
      });
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger("event-repo");
    logger.error("Error in create", {
      error,
    });
    throw error;
  }
};

const updateById = async (id, {
  date,
  title,
  description
}) => {
  try {
    await getKnex()(tables.event)
      .update({
        date,
        title,
        description
      })
      .where("id", id);
    return await findById(id);
  } catch (error) {
    const logger = getChildLogger("event-repo");
    logger.error("Error in updateById", {
      error,
    });
    throw error;
  }
};

const deleteById = async (id) => {
  try {
    const rowsAffected = await getKnex()(tables.event)
      .delete()
      .where("id", id);

    return rowsAffected > 0;
  } catch (error) {
    const logger = getChildLogger("event-repo");
    logger.error("Error in deleteById", {
      error,
    });
    throw error;
  }
};

const findById = async (id) => {
  const event = await getKnex()(tables.event).where("id", id)
    .first();

  return event;
};

module.exports = {
  findAll,
  create,
  updateById,
  deleteById,
};