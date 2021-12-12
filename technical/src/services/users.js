import axios from 'axios';

const baseUrl = '/api/users';

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`);
  return response;
};

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject);
  return response;
};

const update = async (id, newObject) => {
  const response = await axios.put(`${baseUrl}/${id}`, newObject);
  return response;
};

export default {
  getAll, remove, create, update,
};
