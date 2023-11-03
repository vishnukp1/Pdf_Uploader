import axios from "axios";

const token = localStorage.getItem("token");
const userId =  localStorage.getItem("userId")

const api = axios.create({
  baseURL: 'http://localhost:5555', 
  headers: {
    'Authorization': `Bearer ${token}`, 
    'Content-Type': 'application/json',
    'x-user-id': userId, 
  },
});

export default api; 
