const config = require("config");
const {
  getChildLogger
} = require("../core/logging");
const eventRepository = require("../repository/event");

const DEFAULT_PAGINATION_LIMIT = config.get("pagination.limit");
const DEFAULT_PAGINATION_OFFSET = config.get("pagination.offset");

const debugLog = (message, meta = {}) => {
  if (!this.logger) this.logger = getChildLogger("event-service");
  this.logger.debug(message, meta);
};

const getAll = async (
  limit = DEFAULT_PAGINATION_LIMIT,
  offset = DEFAULT_PAGINATION_OFFSET,
) => {
  debugLog("Fetching all event", {
    limit,
    offset
  });
  const data = await eventRepository.findAll({
    limit,
    offset
  });
  return {
    data,
    limit,
    offset
  };
};

const create = ({
  date,
  title,
  description
}) => {
  const newEvent = {
    date,
    title,
    description
  };
  debugLog("Creating new event", newEvent);
  return eventRepository.create(newEvent);
};

const updateById = (id, {
  date,
  title,
  description
}) => {
  const updatedEvent = {
    date,
    title,
    description
  };
  debugLog(`Updating event with id ${id}`, updatedEvent);
  return eventRepository.updateById(id, updatedEvent);
};

const deleteById = async (id) => {
  debugLog(`Deleting event with id ${id}`);
  await eventRepository.deleteById(id);
};

module.exports = {
  getAll,
  create,
  updateById,
  deleteById,
};