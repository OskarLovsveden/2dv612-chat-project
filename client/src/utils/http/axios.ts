import axios from "axios";

axios.defaults.baseURL = 'http://localhost:5000/api';
axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.response.status) {
      case 404:
          break;
    }
    return Promise.reject(error.response);
  },
);

export default axios;