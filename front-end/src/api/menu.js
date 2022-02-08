import {
  axios
} from '.';

export const getAllMenus = async () => {
  const {
    data
  } = await axios.get("menus");
  return data;
}

export const saveMenu = async ({
  id,
  price,
  ingredients,
}) => {
  const {
    data
  } = await axios({
    method: "put",
    url: `menus/${id}`,
    data: {
      price,
      ingredients,
    },
  });
  return data;
};

export const deleteMenu = async (id) => {
  await axios.delete(`menus/${id}`);
};