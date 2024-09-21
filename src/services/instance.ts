import axios from 'axios';
import auth from './auth'


const BASEURL = 'http://127.0.0.1:8000/api/v1/'
const instance = axios.create({
    baseURL: BASEURL
});

let isRefreshing = false

instance.interceptors.request.use( (config) => {
    if (!config.url?.includes("refresh")){
        config.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
    }
    
    return config;
 });

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
        error.config.headers.Authorization = 'Bearer ' + localStorage.getItem('access')
        const resp = await instance(error.config)
        return resp
    }
    return Promise.reject(error);
});

export default instance