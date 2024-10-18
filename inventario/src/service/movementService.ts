import axios from 'axios';

const API_URL = 'http://localhost:3000/api/movements';

export const getMovements = async () => {
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const createMovement = async (movement: any) => {
  const response = await axios.post(API_URL, movement, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};