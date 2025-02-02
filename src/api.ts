import axios from 'axios';

const API_URL = 'http://localhost:3000'; 

const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem('token') ? 'Bearer ' + localStorage.getItem('token'): undefined,
  },
});

export default axiosInstance;