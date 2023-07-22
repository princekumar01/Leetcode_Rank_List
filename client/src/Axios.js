import Axios from 'axios';
function authRequestInterceptor(config) {
  const token = JSON.parse(localStorage.getItem('token'));
  if (token) {
    config.headers.authorization = `${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
}
const API_URL="http://localhost:8080";
 const api = Axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use(authRequestInterceptor);
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
