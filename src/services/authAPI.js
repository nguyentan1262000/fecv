import axios from "axios";

const requestLogin = (data) => {
    return axios.post("http://localhost:8083/auth/login",data);
}

const requestVeryfyOtp = (data) => {
    return axios.post("http://localhost:8083/auth/verify-otp-login",data);
}

const requestLogout = () => {
    const refreshToken = localStorage.getItem("refreshToken");
    const accessToken = localStorage.getItem("accessToken");
    return axios.post("http://localhost:8083/auth/logout",null,{
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'X-Refresh-Token': refreshToken
        }
    });
}

export {requestLogin,requestLogout,requestVeryfyOtp}