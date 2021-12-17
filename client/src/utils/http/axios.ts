import axios from "axios";

axios.defaults.baseURL = process.env.API_HOST+":"+process.env.API_PORT+"/api";
if(localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token') 
}
/* axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Catch any erronous status codes
    // redirect on un-authed?
    switch (error.response.status) {
      case 404:
          break;
    }
    return Promise.reject(error.response);
  },
); */

export default axios;