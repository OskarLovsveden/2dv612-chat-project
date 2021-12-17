import axios from "axios";

console.log(process.env.PUBLIC_URL)

axios.defaults.baseURL = `${process.env.PUBLIC_URL}/api`;
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