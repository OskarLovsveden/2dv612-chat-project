import axios from 'axios';

/* axios.defaults.baseURL = 'http://localhost:5000/api';
const token = window.localStorage.getItem('token');
console.log(token)
if(token) {
  axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
} */
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

/* export default axios; */

export const instance = () => {
    console.log('HAHA JAG ÄR HÄR');
    const token = window.localStorage.getItem('token');
    console.log(token);
    const options = {
        baseURL: 'http://localhost:5000/api',
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        } 
    };

    return axios.create(options);

};
