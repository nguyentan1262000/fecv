import axios from './axios'

const requestLogin = (data) => {
    return axios.post("/auth/login",data);
}

export {requestLogin}