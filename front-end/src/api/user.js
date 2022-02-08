import {
  axios
} from '.';

export const login = async ({
  username,
  password
}) => {
  const {
    data
  } = await axios.post(`user/login`, {
    username,
    password
  });
  return data;
};

export const getUserById = async (id) => {
  const {
    data
  } = await axios.get(`user/${id}`);
  return data;
}