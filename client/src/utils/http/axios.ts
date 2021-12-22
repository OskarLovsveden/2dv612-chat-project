import axios from 'axios';
import config from '../../config';

const { BASE_URL } = config;

export const instance = () => {
    console.log('HAHA JAG ÄR HÄR');
    const token = window.localStorage.getItem('token');
    console.log(token);
    const options = {
        baseURL: `${BASE_URL}/api`,
        headers: {
            Authorization: token ? `Bearer ${token}` : ''
        } 
    };

    return axios.create(options);

};
