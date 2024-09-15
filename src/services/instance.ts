import axios from 'axios';
import auth from './auth'


const BASEURL = 'http://127.0.0.1:8000/api/v1/'
const instance = axios.create({
    baseURL: BASEURL
});

let isRefreshing = false

instance.interceptors.request.use(function (config) {
    config.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
    return config;
 });

instance.interceptors.response.use( (response) => {
    return response;
  }, async (error) => {
    console.log('here')
    if (error.response.status === 401 && !isRefreshing){
        isRefreshing = true
        const status = await auth.refreshToken()
        isRefreshing = false
        if (status !== 200){
            return Promise.reject(error); 
        } 
        error.config.headers['Authorization'] = 'Bearer ' + localStorage.getItem('access')
        return axios.request(error.config)
    }
    return Promise.reject(error);
});

export default instance