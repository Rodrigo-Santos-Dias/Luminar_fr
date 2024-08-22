import axios from 'axios';

const api = axios.create({
  // baseURL: 'https://luminar-aikf.onrender.com/'
  baseURL: 'http://localhost:8080/',
});

export const registerUser = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const login = async (url: string, data: Object, setData: Function) => {
  const response = await api.post(url, data);
  setData(response.data);
};

export const find = async (url: string, setData: Function, header: Object) => {
  const response = await api.get(url, header);
  setData(response.data);
  return response.data; // Retorna os dados para uso imediato
};

export const register = async (url: string, data: Object, setData: Function, header: Object) => {
  const response = await api.post(url, data, header);
  setData(response.data);
};

export const update = async (url: string, data: Object, setData: Function, header: Object) => {
  const response = await api.put(url, data, header);
  setData(response.data);
};

export const remove = async (url: string, header: Object) => {
  await api.delete(url, header);
};
