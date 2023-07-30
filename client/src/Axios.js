//import dotenv from 'dotenv';
import Axios from 'axios';
// import dotenv from 'dotenv';
// dotenv.config();
// import dotenv from 'dotenv-webpack';
// dotenv.config(); 
const API_URL=process.env.REACT_APP_BASE_URL;
// console.log(process.env.REACT_APP_BASE_URL)
 const api = Axios.create({
  baseURL: API_URL,
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const message = error.response?.data?.message || error.message;
    console.log(message,error.response.status)
    error.response.status===400?alert('Already Registered!'):console.log(error);
    return Promise.reject(error);
  }
);
export default api;
