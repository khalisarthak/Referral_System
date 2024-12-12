import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // Backend server URL
});

// API endpoints
export const registerUser = (data) => API.post('/register', data);
export const makePurchase = (data) => API.post('/purchase', data);
export const fetchEarnings = (userId) => API.get(`/earnings/${userId}`);
export const getPurchaseDetails = (userId) => API.get(`/getPurchaseDetails/${userId}`);
export const getEarningDetails = (userId) => API.get(`/getEarningDetails/${userId}`);

export default API;
