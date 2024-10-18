import axios from 'axios';

const API_URL = 'http://localhost:3000/api/reports';

export const getInventoryReport = async () => {
  const response = await axios.get(`${API_URL}/inventory`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};

export const getMovementReport = async () => {
  const response = await axios.get(`${API_URL}/movements`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  });
  return response.data;
};