import axios from 'axios';
import auth from './auth'


const BASEURL = 'http://127.0.0.1:8000/api/v1/'
const instance = axios.create({
    baseURL: BASEURL
});

const AUTH_TOKEN = 'Bearer ' + localStorage.getItem('access')

instance.defaults.headers.common['Authorization'] =  AUTH_TOKEN;

let isRefreshing = false


instance.interceptors.response.use( (response) => {
    return response;
  }, async (error) => {
   
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