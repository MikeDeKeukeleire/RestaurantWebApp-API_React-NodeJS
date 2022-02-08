import {
  axios
} from '.';

export const getAllEvents = async () => {
  const {
    data
  } = await axios.get("events");
  return data;
}

export const saveEvent = async ({
  id,
  date,
  title,
  description,
}) => {
  const {
    data
  } = await axios({
    method: "put",
    url: `events/${id}`,
    data: {
      date,
      title,
      description,
    },
  });
  return data;
};

export const addEvent = async ({
  date,
  title,
  description,
}) => {
  const {
    data
  } = await axios({
    method: "post",
    url: `events`,
    data: {
      date,
      title,
      description,
    },
  });
  return data;
};

export const deleteEvent = async (id) => {
  await axios.delete(`events/${id}`);
};