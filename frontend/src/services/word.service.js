import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const createWordService = async (payload) => {
  const response = await axios.post(`${BASE_URL}/words`, payload);
  return response.data;
};

export const getWordByIdService = async (id) => {
  const response = await axios.get(`${BASE_URL}/words/${id}`);
  return response.data;
};

export const getAllWordsService = async (search) => {
  const response = await axios.get(`${BASE_URL}/words?search=${search}`);
  return response.data;
};

export const updateWordByIdService = async (id, payload) => {
  const response = await axios.put(`${BASE_URL}/words/${id}`, payload);
  return response.data;
};

export const deleteWordByIdService = async (id) => {
  const response = await axios.delete(`${BASE_URL}/words/${id}`);
  return response.data;
};
