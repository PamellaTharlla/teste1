import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/alimentos', 
});

export const getByName = (nome) => {
  return api.get(`/nome/${nome}`);
};

export const getById = (id) => {
  return api.get(`/${id}`);
};

export default api;