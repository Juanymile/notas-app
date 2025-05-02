import axios from 'axios';

const API_URL = 'http://localhost:8000/api/notas'; // change if needed

export const getNotas = () => {
  return axios.get(API_URL);
};

export const createNota = (nota) => {
  return axios.post(API_URL, nota);
};
