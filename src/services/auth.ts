import axios from 'axios';

const AUTH_BASEURL = 'http://127.0.0.1:8000/api/v1/dj-rest-auth/'
const authInstance = axios.create({
    baseURL: AUTH_BASEURL
});

authInstance.interceptors.response.use( (response) => {
    return response;
  }, async (error) => {
     return Promise.reject(error);
});


const login = async (username:string, password:string) => {
    let url =  'login/'
    const resp = await authInstance.post(url, {
        username: username, 
        password: password
    })
    if (resp.status === 200){
        localStorage.setItem('access', resp.data['access']);
        localStorage.setItem('refresh', resp.data['refresh']);
        return resp.data['user']
    }    
    return null

}

const register = async (username: string, email: string, password:  string,  confirm_password: string) => {

    let url =  'registration/'
    const resp = await authInstance.post(url, {
        username: username,
        email: email, 
        password1: password,
        password2: confirm_password
    })
    if (resp.status === 200){
        localStorage.setItem('access', resp.data['access']);
        localStorage.setItem('refresh', resp.data['refresh']);
        return resp.data['user']
    }    
    return null
}

const logout = async () => {
    const token = localStorage.getItem('refresh');
    let url = 'logout/'
    const resp = await authInstance.post(url, {
        refresh: token, 
    })
    if (resp.status === 200){
        localStorage.removeItem('access');
        localStorage.removeItem('refresh');
    }
}

const refreshToken = async () => {
    const token = localStorage.getItem('refresh');
    let url =  'token/refresh/'
    const resp = await authInstance.post(url, {
        refresh: token, 
    })
    localStorage.setItem('access', resp.data['access']);

    return resp.status
}

export default {login, refreshToken, register, logout}